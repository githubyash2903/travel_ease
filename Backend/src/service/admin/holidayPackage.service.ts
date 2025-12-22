import pool from '../../database/db';
import { AppError } from '../../utils/errors';

/**
 * Create
 */
export async function createHolidayPackage(data: any) {
  const { rows } = await pool.query(
    `
    INSERT INTO holiday_packages (
      title,
      destination,
      category,
      overview,
      duration_days,
      duration_nights,
      price,
      taxes,
      rating,
      min_persons,
      cover_image,
      images,
      inclusions,
      itinerary,
      is_active
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,COALESCE($15,true)
    )
    RETURNING *
    `,
    [
      data.title,
      data.destination,
      data.category,
      data.overview,
      data.duration_days,
      data.duration_nights,
      data.price,
      data.taxes ?? 0,
      data.rating,
      data.min_persons ?? 1,
      data.cover_image,
      JSON.stringify(data.images ?? []),
      JSON.stringify(data.inclusions ?? []),
      JSON.stringify(data.itinerary ?? []),
      data.is_active,
    ]
  );

  return rows[0];
}


/**
 * List (Admin)
 */
export async function listHolidayPackages(query: any) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 100);
  const offset = (page - 1) * limit;

  const clauses: string[] = ['is_active = true'];
  const values: any[] = [];
  let i = 1;

  if (query.destination) {
    clauses.push(`LOWER(destination) = LOWER($${i++})`);
    values.push(query.destination);
  }

  if (query.category) {
    clauses.push(`category = $${i++}`);
    values.push(query.category);
  }

  if (query.minPrice) {
    clauses.push(`price >= $${i++}`);
    values.push(Number(query.minPrice));
  }

  if (query.maxPrice) {
    clauses.push(`price <= $${i++}`);
    values.push(Number(query.maxPrice));
  }

  const where = `WHERE ${clauses.join(' AND ')}`;

  const sql = `
    SELECT
      *
    FROM holiday_packages
    ${where}
    ORDER BY created_at DESC
    LIMIT $${i++} OFFSET $${i}
  `;

  values.push(limit, offset);
  const { rows } = await pool.query(sql, values);
  return rows;
}
export async function getHolidayPackageById(id: string) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM holiday_packages
    WHERE id = $1 AND is_active = true
    `,
    [id]
  );

  if (!rows.length) {
    throw new AppError('Holiday package not found', 404);
  }

  return rows[0];
}


/**
 * Update
 */
export async function updateHolidayPackage(id: string, data: any) {
  const { rowCount } = await pool.query(
    `
    UPDATE holiday_packages
    SET
      title = COALESCE($2, title),
      destination = COALESCE($3, destination),
      category = COALESCE($4, category),
      overview = COALESCE($5, overview),
      duration_days = COALESCE($6, duration_days),
      duration_nights = COALESCE($7, duration_nights),
      price = COALESCE($8, price),
      taxes = COALESCE($9, taxes),
      rating = COALESCE($10, rating),
      min_persons = COALESCE($11, min_persons),
      cover_image = COALESCE($12, cover_image),
      images = COALESCE($13, images),
      inclusions = COALESCE($14, inclusions),
      itinerary = COALESCE($15, itinerary),
      is_active = COALESCE($16, is_active),
      updated_at = now()
    WHERE id = $1
    `,
    [
      id,
      data.title,
      data.destination,
      data.category,
      data.overview,
      data.duration_days,
      data.duration_nights,
      data.price,
      data.taxes,
      data.rating,
      data.min_persons,
      data.cover_image,
      data.images && JSON.stringify(data.images),
      data.inclusions && JSON.stringify(data.inclusions),
      data.itinerary && JSON.stringify(data.itinerary),
      data.is_active,
    ]
  );

  if (!rowCount) {
    throw new AppError('Holiday package not found', 404);
  }
}


/**
 * Activate / Deactivate / Delete
 */
export async function activateHolidayPackage(id: string) {
  const { rowCount } = await pool.query(
    `UPDATE holiday_packages SET is_active = true WHERE id = $1 AND is_active = false`,
    [id]
  );
  if (!rowCount) throw new AppError('Not found or already active', 404);
}

export async function deactivateHolidayPackage(id: string) {
  const { rowCount } = await pool.query(
    `UPDATE holiday_packages SET is_active = false WHERE id = $1 AND is_active = true`,
    [id]
  );
  if (!rowCount) throw new AppError('Not found or already inactive', 404);
}

export async function deleteHolidayPackage(id: string) {
  const { rowCount } = await pool.query(
    `DELETE FROM holiday_packages WHERE id = $1`,
    [id]
  );
  if (!rowCount) throw new AppError('Holiday package not found', 404);
}
