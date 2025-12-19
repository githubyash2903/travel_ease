import { Request, Response } from "express";
import pool from "../../database/db";
import bcrypt from "bcrypt";
import { AuthRequest } from "../../middlewares/auth";

// ======================= GET MY PROFILE =======================

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      "SELECT id, name, email, phone FROM users WHERE id = $1",
      [userId]
    );

    return res.json({
      success: true,
      user: result.rows[0],
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


// ======================= UPDATE PROFILE =======================

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { name, phone } = req.body;

    if (!name && !phone) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const result = await pool.query(
      `UPDATE users 
       SET name = COALESCE($1, name),
           phone = COALESCE($2, phone)
       WHERE id = $3
       RETURNING id, name, email, phone, role`,
      [name || null, phone || null, userId]
    );

    return res.json({
      success: true,
      message: "Profile updated",
      user: result.rows[0],
    });

  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ======================= CHANGE PASSWORD =======================

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both passwords required" });
    }

    // Get user
    const result = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // Validate old password
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(401).json({ message: "Old password incorrect" });
    }

    // Hash new password
    const newHash = await bcrypt.hash(newPassword, 10);

    // Update
    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [newHash, userId]
    );

    return res.json({ success: true, message: "Password changed successfully" });

  } catch (error) {
    console.error("ChangePassword Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ======================= DELETE ACCOUNT (OPTIONAL) =======================

export const deleteMyAccount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    await pool.query("DELETE FROM users WHERE id = $1", [userId]);

    return res.json({ success: true, message: "Account deleted" });

  } catch (error) {
    console.error("DeleteUser Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
