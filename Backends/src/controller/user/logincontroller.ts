import { Request, Response } from "express";
import pool from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResponse, sendErrorResponse } from "../../utils/sendResponse";
import { registerSchema, loginSchema } from "../../validation/authValidation";
import { AuthRequest } from "../../middleware/jwt";
import { send } from "process";


const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is required in environment variables");
}

//  REGISTER

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone_no, country_code } = req.body;

    // Input validation using Joi schema
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, 400, error.details[0].message);
    }

    // Check user already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [value.email]
    );

    if (existingUser.rows.length > 0) {
      return sendErrorResponse(res, 400, "Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(value.password, 10);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (name, email, password, country_code, phone_no)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email`,
      [value.name, value.email, hashedPassword, value.country_code, value.phone_no]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email , role: 'user'},
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    const responseData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };

    return sendResponse(res, 201, "User registered successfully", responseData);

  } catch (error: any) {
    console.error("Register Error:", error);
    return sendErrorResponse(res, 500, error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Validate input using Joi schema
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, 400, error.details[0].message);
    }

    const { email, password } = value;

    // Fetch user
    const result = await pool.query(
      "SELECT id, name, email, password, role, status FROM users WHERE email = $1 AND deleted_at IS NULL",
      [email]
    );

    if (result.rows.length === 0) {
      return sendErrorResponse(res, 401, "Invalid email or password");
    }

    const user = result.rows[0];
    console.log(user.status);
    if(user.status !== 'active'){
      return sendErrorResponse(res, 403, "User account has been deactivated");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return sendErrorResponse(res, 401, "Invalid email or password");
    }
    const lastLogin = "UPDATE users SET last_login = $1 WHERE id = $2";
    await pool.query(lastLogin, [new Date(), user.id]);
    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email,role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const responseData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };

    return sendResponse(res, 200, "Login successful", responseData);

  } catch (error: any) {
    console.error("Login Error:", error);
    return sendErrorResponse(res, 500, error);
  }
};


export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      "SELECT id, name, email, phone_no, country_code , role FROM users WHERE id = $1",
      [userId]
    );

    return sendResponse(res, 200, "Profile fetched successfully", result.rows[0]);

  } catch (error) {
    return sendErrorResponse(res, 500, error);
  }
};


// ======================= UPDATE PROFILE =======================

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { name, phone ,email } = req.body;

    if (!name && !phone && !email) {
      return sendErrorResponse(res, 400, "Nothing to update");
    }

    const result = await pool.query(
      `UPDATE users 
       SET name = COALESCE($1, name),
           phone_no = COALESCE($2, phone_no),
           email = COALESCE($3, email)
       WHERE id = $4
       RETURNING id, name, email, phone_no, role`,
      [name || null, phone || null, email || null, userId]
    );
    return sendResponse(res, 200, "Profile updated successfully", result.rows[0]);  

  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return sendErrorResponse(res, 500,error);
  }
};

// ======================= CHANGE PASSWORD =======================

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return sendErrorResponse(res, 400, "Both passwords required");
    }

    // Get user
    const result = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return sendErrorResponse(res, 404, "User not found");
    }

    const user = result.rows[0];

    // Validate old password
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return sendErrorResponse(res, 401, "Old password incorrect");
    } 

    // Hash new password
    const newHash = await bcrypt.hash(newPassword, 10);

    // Update
    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [newHash, userId]
    );
    return sendResponse(res, 200, "Password changed successfully", null); 

  } catch (error) {
    console.error("ChangePassword Error:", error);
    return sendErrorResponse(res, 500, error);
  }
};

// ======================= DELETE ACCOUNT (OPTIONAL) =======================

export const deleteMyAccount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

   const result = await pool.query("update users set deleted_at = NOW() where id = $1 RETURNING id", [userId]);
    if (result.rowCount === 0) {
      return sendErrorResponse(res, 404, "User not found");
    }
    return sendResponse(res, 200, "Account deleted successfully", null);

  } catch (error) {
    console.error("DeleteUser Error:", error);
    return sendErrorResponse(res, 500, error);
  }
};