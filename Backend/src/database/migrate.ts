import pool from './db';

export type Migration = {
  id: number;
  name: string;
  up: string;
};

/**
 * Extracts table name if migration creates a table.
 * Returns null for enums, indexes, functions, etc.
 */
function extractPrimaryTableName(sql: string): string | null {
  const match = sql.match(/CREATE TABLE IF NOT EXISTS\s+([a-zA-Z_]+)/i);
  return match ? match[1] : null;
}

export async function runMigrations(migrations: Migration[]) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Migration history table
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id INT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    // Load applied migrations
    const { rows } = await client.query(
      'SELECT id FROM schema_migrations'
    );
    const applied = new Set<number>(rows.map(r => r.id));

    // Run migrations in order
    for (const m of migrations.sort((a, b) => a.id - b.id)) {
      const tableName = extractPrimaryTableName(m.up);

      // If already applied
      if (applied.has(m.id)) {
        // If table migration, verify table exists
        if (tableName) {
          const { rowCount } = await client.query(
            `
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public'
              AND table_name = $1
            `,
            [tableName]
          );

          if (rowCount > 0) {
            continue;
          }
        } else {
          // Non-table migration (enum, index, etc)
          continue;
        }
      }

      console.log(`Applying migration ${m.id} - ${m.name}`);
      await client.query(m.up);

      // Record migration only once
      if (!applied.has(m.id)) {
        await client.query(
          'INSERT INTO schema_migrations (id, name) VALUES ($1, $2)',
          [m.id, m.name]
        );
      }
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
