import pool from './db';

export type Migration = {
  id: number;
  name: string;
  up: string;
};
function extractPrimaryTableName(sql: string): string {
  const match = sql.match(/CREATE TABLE IF NOT EXISTS ([a-zA-Z_]+)/i);
  if (!match) {
    throw new Error('Cannot determine table name from migration');
  }
  return match[1];
}

export async function runMigrations(migrations: Migration[]) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id INT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    const { rows } = await client.query(
      'SELECT id FROM schema_migrations'
    );
    const applied = new Set(rows.map(r => r.id));

    for (const m of migrations.sort((a, b) => a.id - b.id)) {
      const tableName = extractPrimaryTableName(m.up);

      const { rowCount } = await client.query(
        `
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = $1
        `,
        [tableName]
      );

      const tableExists = rowCount > 0;

      if (applied.has(m.id) && tableExists) {
        continue;
      }

      console.log(`Applying migration ${m.id} - ${m.name}`);
      await client.query(m.up);

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
