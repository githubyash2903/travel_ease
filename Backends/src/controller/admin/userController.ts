import { Request, Response } from "express";
import pool from "../../config/db";
import { sendResponse, sendErrorResponse } from "../../utils/sendResponse";

/**
 * Get all users where role is not admin
 * @param req Request object
 * @param res Response object
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Query to get all users where role is not admin
    const query = `
      SELECT 
        id, 
        name, 
        email, 
        role, 
        last_login,
        status,
        created_at,
        country_code,
        phone_no
      FROM users 
      WHERE role != 'admin' OR role IS NULL
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return sendResponse(res, 200, "NO user found", []);
    }

    return sendResponse(
      res, 
      200, 
      `Found ${result.rows.length} user(s)`, 
      result.rows
    );

  } catch (error: any) {
    console.error("Get All Users Error:", error);
    return sendErrorResponse(res, 500, error.message);
  }
};

 /**
 * Get user by ID
 * @param req Request object
 * @param res Response object
 */
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendErrorResponse(res, 400, "User ID is required");
    }

    const query = `
      SELECT 
        id, 
        name, 
        email, 
        role, 
        created_at,
        country_code,
        phone_no
      FROM users 
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return sendErrorResponse(res, 404, "User not found");
    }

    return sendResponse(
      res, 
      200, 
      "User found successfully", 
      result.rows[0]
    );

  } catch (error: any) {
    console.error("Get User By ID Error:", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};


/**
 * Delete user (admin function)
 * @param req Request object
 * @param res Response object
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendErrorResponse(res, 400, "User ID is required");
    }

    // First check if user exists
    const checkQuery = "SELECT id, role FROM users WHERE id = $1";
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return sendErrorResponse(res, 404, "User not found");
    }

    // Prevent deleting admin users (optional safety check)
    if (checkResult.rows[0].role === 'admin') {
      return sendErrorResponse(res, 403, "Cannot delete admin users");
    }

    const deleteQuery = "DELETE FROM users WHERE id = $1";
    await pool.query(deleteQuery, [id]);

    return sendResponse(
      res, 
      200, 
      "User deleted successfully"
    );

  } catch (error: any) {
    console.error("Delete User Error:", error);
    return sendErrorResponse(res, 500, error.message);
  }
};

export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { id,status } = req.body;  
    if (!id) {
      return sendErrorResponse(res, 400, "User ID is required");
    }
    // First check if user exists
    const checkQuery = "SELECT id FROM users WHERE id = $1";
    const checkResult = await pool.query(checkQuery, [id]);
    if (checkResult.rows.length === 0) {
      return sendErrorResponse(res, 404, "User not found");
    } 
    const deactivateQuery = "UPDATE users SET status = $1 WHERE id = $2";
    await pool.query(deactivateQuery, [status, id]);
    return sendResponse(
      res, 
      200, 
      "User deactivated successfully"
    );
  } catch (error: any) {
    console.error("Deactivate User Error:", error);
    return sendErrorResponse(res, 500, error.message);
  }
};