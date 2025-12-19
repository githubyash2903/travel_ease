import fs from "fs";
import path from "path";
import pool from "./db";

export const runMigrations = async () => {
  try {
    const filePath = path.join(__dirname, "schema.sql");
    const sql = fs.readFileSync(filePath, "utf8");

    await pool.query(sql);

    console.log("✅ Database schema checked & synced successfully!");
  } catch (error) {
    console.error("❌ Migration error:", error);
  }
};
