import { Request, Response } from "express";
import pool from "../../database/db";

/* ----------------------------------------------------
   GET ALL USERS
---------------------------------------------------- */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, full_name, email, phone, created_at
      FROM users
      ORDER BY created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("GET USERS ERROR", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* ----------------------------------------------------
   GET USER ROLES
---------------------------------------------------- */
export const getUserRoles = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id as user_id, role
      FROM users
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("GET ROLES ERROR", err);
    res.status(500).json({ message: "Failed to fetch roles" });
  }
};

/* ----------------------------------------------------
   GET BOOKINGS BY USER
---------------------------------------------------- */
export const getBookingsByUser = async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const result = await pool.query(
      `
      SELECT id, booking_reference, booking_type, total_amount, status
      FROM bookings
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET BOOKINGS ERROR", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
