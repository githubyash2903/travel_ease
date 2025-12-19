import { Request, Response } from "express";
import pool from "../../database/db";

/* -----------------------------------------------------
   GET ALL USERS (pagination + search)
----------------------------------------------------- */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      search = "",
      role
    } = req.query as any;

    const pageNum = Math.max(1, Number(page));
    const pageSize = Math.min(100, Number(limit));
    const offset = (pageNum - 1) * pageSize;

    let base = `
      SELECT id, name, email, role, is_blocked, created_at
      FROM users
      WHERE 1=1
    `;
    const params: any[] = [];
    let i = 1;

    if (search) {
      base += ` AND (LOWER(name) LIKE $${i} OR LOWER(email) LIKE $${i})`;
      params.push(`%${search.toLowerCase()}%`);
      i++;
    }

    if (role) {
      base += ` AND role = $${i++}`;
      params.push(role);
    }

    const countQuery = `SELECT COUNT(*) FROM (${base}) t`;
    const countRes = await pool.query(countQuery, params);
    const total = Number(countRes.rows[0].count);

    base += ` ORDER BY created_at DESC LIMIT $${i++} OFFSET $${i++}`;
    params.push(pageSize, offset);

    const users = await pool.query(base, params);

    res.json({
      meta: {
        total,
        page: pageNum,
        limit: pageSize,
        pages: Math.ceil(total / pageSize)
      },
      users: users.rows
    });
  } catch (err) {
    console.error("ADMIN USERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* -----------------------------------------------------
   BLOCK / UNBLOCK USER
----------------------------------------------------- */
export const toggleUserBlock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE users
       SET is_blocked = NOT is_blocked
       WHERE id = $1
       RETURNING id, is_blocked`,
      [id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User status updated",
      user: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

/* -----------------------------------------------------
   UPDATE USER ROLE
----------------------------------------------------- */
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["USER", "ADMIN"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const result = await pool.query(
      `UPDATE users SET role = $1 WHERE id = $2 RETURNING id, role`,
      [role, id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Role updated",
      user: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update role" });
  }
};

/* -----------------------------------------------------
   DELETE USER
----------------------------------------------------- */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
