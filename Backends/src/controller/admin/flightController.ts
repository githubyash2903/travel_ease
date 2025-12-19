import { Request, Response } from 'express';
import pool from '../../config/db';
import { sendResponse, sendErrorResponse } from '../../utils/sendResponse';
const { addFlightSchema, updateFlightSchema, flightSearchSchema } = require('../../validation/fligthValidation');

/**
 * Create a new flight
 */
export const createFlight = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { error, value } = addFlightSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, 400, error.details[0].message);
    }

    const { airline, fligth_no,source, destination, departure, arrival, totalSeats, price = 0, stops = 0 } = value;

    // Check for duplicate flights (same airline, source, destination, departure)
    const duplicateCheck = await pool.query(
      'SELECT id FROM flights WHERE airline = $1 AND fligth_no = $2 AND source = $3 AND destination = $4 AND departure = $5',
      [airline, fligth_no, source, destination, departure]
    );

    if (duplicateCheck.rows.length > 0) {
      return sendErrorResponse(res, 409, 'A flight with the same details already exists');
    }

    const query = `
      INSERT INTO flights (airline, fligth_no, source, destination, departure, arrival, total_seats, price, stops)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [airline, fligth_no, source, destination, departure, arrival, totalSeats, price, stops];
    const result = await pool.query(query, values);

    return sendResponse(res, 201, 'Flight created successfully', result.rows[0]);
  } catch (error) {
    console.error('Error creating flight:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

/**
 * Get all flights with optional search and pagination
 */
export const getAllFlights = async (req: Request, res: Response) => {
  try {
    // Validate query parameters
    const { error, value } = flightSearchSchema.validate(req.query);
    if (error) {
      return sendErrorResponse(res, 400, error.details[0].message);
    }

    const {fligth_no, source, destination, departureDate, airline, maxPrice, maxStops, page = 1, limit = 10 } = value;

    const offset = (page - 1) * limit;
    let whereConditions = [];
    let queryParams = [];
    let paramCounter = 1;

    // Build dynamic WHERE clause
    if (source) {
      whereConditions.push(`LOWER(source) = LOWER($${paramCounter++})`);
      queryParams.push(source);
    }
    if (fligth_no) {
      whereConditions.push(`LOWER(fligth_no) = LOWER($${paramCounter++})`);
      queryParams.push(fligth_no);
    }

    if (destination) {
      whereConditions.push(`LOWER(destination) = LOWER($${paramCounter++})`);
      queryParams.push(destination);
    }

    if (departureDate) {
      whereConditions.push(`DATE(departure) = $${paramCounter++}`);
      queryParams.push(departureDate);
    }

    if (airline) {
      whereConditions.push(`LOWER(airline) ILIKE LOWER($${paramCounter++})`);
      queryParams.push(`%${airline}%`);
    }

    if (maxPrice) {
      whereConditions.push(`price <= $${paramCounter++}`);
      queryParams.push(maxPrice);
    }

    if (maxStops !== undefined) {
      whereConditions.push(`stops <= $${paramCounter++}`);
      queryParams.push(maxStops);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count for pagination
    const countQuery = `SELECT COUNT(*) FROM flights ${whereClause} AND deleted_at IS NULL`;
    const countResult = await pool.query(countQuery, queryParams);
    const totalCount = parseInt(countResult.rows[0].count);

    // Get paginated results
    const dataQuery = `
      SELECT * FROM flights 
      ${whereClause}
      AND deleted_at IS NULL
      ORDER BY departure ASC, created_at DESC
      LIMIT $${paramCounter++} OFFSET $${paramCounter++}
    `;

    queryParams.push(limit, offset);
    const result = await pool.query(dataQuery, queryParams);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalRecords: totalCount,
      hasNext: page < Math.ceil(totalCount / limit),
      hasPrev: page > 1
    };

    return sendResponse(res, 200, 'Flights retrieved successfully', {
      flights: result.rows,
      pagination
    });
  } catch (error) {
    console.error('Error fetching flights:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};


/**
 * Get single flight by ID
 */
export const getFlightById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return sendErrorResponse(res, 400, 'Invalid flight ID format');
    }

    const query = 'SELECT * FROM flights WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return sendErrorResponse(res, 404, 'Flight not found');
    }

    return sendResponse(res, 200, 'Flight retrieved successfully', result.rows[0]);
  } catch (error) {
    console.error('Error fetching flight:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

/**
 * Update flight by ID
 */
export const updateFlight = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate request body
    const { error, value } = updateFlightSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, 400, error.details[0].message);
    }

    // Check if flight exists
    const existingFlight = await pool.query('SELECT * FROM flights WHERE id = $1 AND deleted_at IS NULL', [id]);
    if (existingFlight.rows.length === 0) {
      return sendErrorResponse(res, 404, 'Flight not found');
    }

    const { airline, fligth_no, source, destination, departure, arrival, totalSeats, price, stops } = value;

    // Build dynamic update query
    const updateFields = [];
    const values = [];
    let paramCounter = 1;

    if (airline !== undefined) {
      updateFields.push(`airline = $${paramCounter++}`);
      values.push(airline);
    }
    if(fligth_no !== undefined) {
      updateFields.push(`fligth_no = $${paramCounter++}`);
      values.push(fligth_no);
    }
    if (source !== undefined) {
      updateFields.push(`source = $${paramCounter++}`);
      values.push(source);
    }
    if (destination !== undefined) {
      updateFields.push(`destination = $${paramCounter++}`);
      values.push(destination);
    }
    if (departure !== undefined) {
      updateFields.push(`departure = $${paramCounter++}`);
      values.push(departure);
    }
    if (arrival !== undefined) {
      updateFields.push(`arrival = $${paramCounter++}`);
      values.push(arrival);
    }
    if (totalSeats !== undefined) {
      updateFields.push(`total_seats = $${paramCounter++}`);
      values.push(totalSeats);
    }
    if (price !== undefined) {
      updateFields.push(`price = $${paramCounter++}`);
      values.push(price);
    }
    if (stops !== undefined) {
      updateFields.push(`stops = $${paramCounter++}`);
      values.push(stops);
    }

    if (updateFields.length === 0) {
      return sendErrorResponse(res, 400, 'No fields provided for update');
    }

    const query = `
      UPDATE flights 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCounter}
      RETURNING *
    `;

    values.push(id);
    const result = await pool.query(query, values);

    return sendResponse(res, 200, 'Flight updated successfully', result.rows[0]);
  } catch (error) {
    console.error('Error updating flight:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

/**
 * Delete flight by ID
 */
export const deleteFlight = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return sendErrorResponse(res, 400, 'Invalid flight ID format');
    }

    // Check if flight exists
    const existingFlight = await pool.query('SELECT * FROM flights WHERE id = $1', [id]);
    if (existingFlight.rows.length === 0) {
      return sendErrorResponse(res, 404, 'Flight not found');
    }

    const query = 'UPDATE flights SET deleted_at = NOW() WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);

    return sendResponse(res, 200, 'Flight deleted successfully', result.rows[0]);
  } catch (error) {
    console.error('Error deleting flight:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

/**
 * Get flights by route (source to destination)
 */
export const getFlightsByRoute = async (req: Request, res: Response) => {
  try {
    const { source, destination , departure } = req.body;

    if (!source || !destination || !departure) {
      return sendErrorResponse(res, 400, 'Source, destination, and departure are required');
    }

    const query = `
      SELECT * FROM flights 
      WHERE LOWER(source) = LOWER($1) AND LOWER(destination) = LOWER($2)
      AND departure > NOW() AND DATE(departure) = $3
      ORDER BY departure ASC, price ASC
    `;

    const result = await pool.query(query, [source, destination, departure]);
    return sendResponse(res, 200, 'Route flights retrieved successfully', result.rows);
  } catch (error) {
    console.error('Error fetching route flights:', error);
    return sendErrorResponse(res, 500, error || 'Internal server error');
  }
};

/**
 * Get flight statistics
 */
export const getFlightStats = async (req: Request, res: Response) => {
  try {
    const statsQuery = `
      SELECT 
        COUNT(*) as total_flights,
        COUNT(DISTINCT airline) as total_airlines,
        COUNT(DISTINCT source) as total_sources,
        COUNT(DISTINCT destination) as total_destinations,
        ROUND(AVG(price), 2) as average_price,
        MIN(price) as min_price,
        MAX(price) as max_price,
        ROUND(AVG(total_seats), 0) as average_seats,
        COUNT(CASE WHEN departure > NOW() THEN 1 END) as future_flights
      FROM flights
    `;

    const result = await pool.query(statsQuery);

    return sendResponse(res, 200, 'Flight statistics retrieved successfully', result.rows[0]);
  } catch (error) {
    console.error('Error fetching flight statistics:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

