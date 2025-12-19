import { Request, Response } from 'express';
import pool from '../../config/db';
import { sendResponse, sendErrorResponse } from '../../utils/sendResponse';
import { getFileUrl, deleteOldFile } from '../../config/multer';
const { platformSettingSchema } = require('../../validation/platformSettingValidation');

/**
 * Get platform settings
 */
export const getPlatformSettings = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT * FROM platform_settings 
      ORDER BY created_at DESC 
      LIMIT 1
    `;
    
    const result = await pool.query(query);
    
    if (result.rows.length === 0) {
      return sendErrorResponse(res, 404, 'Platform settings not found');
    }
         const updateResult = {
      ...result.rows[0],
      logo: `${process.env.BASE_URL}${result.rows[0].logo}` 
    }
    

    return sendResponse(res, 200, 'Platform settings retrieved successfully', updateResult);
  } catch (error) {
    console.error('Error fetching platform settings:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

/**
 * Create platform settings
 */
export const createPlatformSettings = async (req: Request, res: Response) => {
  try {
    // Handle logo file upload first
    let logoUrl = req.body.logo || '';
    if (req.file) {
      logoUrl = getFileUrl('logos', req.file.filename);
    }

    // Prepare data for validation (include uploaded logo URL)
    const requestData = {
      ...req.body,
      logo: logoUrl
    };

    // Validate request body with processed logo URL
    const { error, value } = platformSettingSchema.validate(requestData);
    if (error) {
      // Delete uploaded file if validation fails
      if (req.file) {
        deleteOldFile(req.file.filename);
      }
      return sendErrorResponse(res, 400, error.details[0].message);
    }

    const { websiteName, logo, email, contactNo, maintenanceMode } = value;

    // Check if platform settings already exist
    const existingSettings = await pool.query('SELECT id FROM platform_settings LIMIT 1');
    if (existingSettings.rows.length > 0) {
      // Delete uploaded file if settings already exist
      if (req.file) {
        deleteOldFile(req.file.filename);
      }
      return sendErrorResponse(res, 409, 'Platform settings already exist. Use update instead.');
    }

    const query = `
      INSERT INTO platform_settings (website_name, logo, email, contact_no, maintenance_mode, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `;

    const values = [websiteName, logo, email, contactNo, maintenanceMode];
    const result = await pool.query(query, values);
     const updateResult = {
      ...result.rows[0],
      logo: `${process.env.BASE_URL}${logo}` 
    }

    return sendResponse(res, 201, 'Platform settings created successfully', updateResult);
  } catch (error) {
    console.error('Error creating platform settings:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};

/**
 * Update platform settings
 */
export const updatePlatformSettings = async (req: Request, res: Response) => {
  try {
    // Handle logo file upload first
    let logoUrl = req.body.logo;
    if (req.file) {
      logoUrl = getFileUrl('logos', req.file.filename);
    }

    // Prepare data for validation (include uploaded logo URL if available)
    const requestData = {
      ...req.body
    };
    if (logoUrl !== undefined) {
      requestData.logo = logoUrl;
    }

    // Validate request body using the update schema
    const { error, value } = platformSettingSchema.validate(requestData);
    if (error) {
      // Delete uploaded file if validation fails
      if (req.file) {
        deleteOldFile(req.file.filename);
      }
      return sendErrorResponse(res, 400, error.details[0].message);
    }

    const { websiteName, logo, email, contactNo, maintenanceMode } = value;

    // Check if platform settings exist and get current logo for cleanup
    const existingSettings = await pool.query('SELECT id, logo FROM platform_settings LIMIT 1');
    if (existingSettings.rows.length === 0) {
      // Delete uploaded file if no settings exist
      if (req.file) {
        deleteOldFile(req.file.filename);
      }
      return sendErrorResponse(res, 404, 'Platform settings not found. Please create settings first.');
    }

    const currentLogo = existingSettings.rows[0].logo;

    // Build dynamic update query
    const updateFields = [];
    const values = [];
    let paramCounter = 1;

    if (websiteName !== undefined) {
      updateFields.push(`website_name = $${paramCounter++}`);
      values.push(websiteName);
    }
    if (logo !== undefined) {
      updateFields.push(`logo = $${paramCounter++}`);
      values.push(logo);
    }
    if (email !== undefined) {
      updateFields.push(`email = $${paramCounter++}`);
      values.push(email);
    }
    if (contactNo !== undefined) {
      updateFields.push(`contact_no = $${paramCounter++}`);
      values.push(contactNo);
    }
    if (maintenanceMode !== undefined) {
      updateFields.push(`maintenance_mode = $${paramCounter++}`);
      values.push(maintenanceMode);
    }

    if (updateFields.length === 0) {
      return sendErrorResponse(res, 400, 'No fields provided for update');
    }

    updateFields.push(`updated_at = NOW()`);

    const query = `
      UPDATE platform_settings 
      SET ${updateFields.join(', ')}
      WHERE id = (SELECT id FROM platform_settings LIMIT 1)
      RETURNING *
    `;

    const result = await pool.query(query, values);

    // Delete old logo file if a new one was uploaded and update was successful
    if (req.file && currentLogo) {
      deleteOldFile(currentLogo);
    }
    console.log(process.env.BASE_URL);
    const updateResult = {
      ...result.rows[0],
      logo: `${process.env.BASE_URL}${logoUrl}` || `${process.env.BASE_URL}${currentLogo}`
    }

    return sendResponse(res, 200, 'Platform settings updated successfully', updateResult);
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      deleteOldFile(req.file.filename);
    }
    console.error('Error updating platform settings:', error);
    return sendErrorResponse(res, 500, 'Internal server error');
  }
};
