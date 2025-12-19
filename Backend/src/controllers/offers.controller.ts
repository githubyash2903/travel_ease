import { Request, Response } from "express";
import pool from "../database/db";

/* ---------------------------------
   PUBLIC – GET ALL ACTIVE OFFERS
---------------------------------- */
export const getOffers = async (_: Request, res: Response) => {
  const result = await pool.query(
    `SELECT * FROM offers WHERE is_active = true ORDER BY created_at DESC`
  );
  res.json(result.rows);
};

/* ---------------------------------
   ADMIN – CREATE OFFER
---------------------------------- */
export const createOffer = async (req: Request, res: Response) => {
  const {
    title,
    subtitle,
    description,
    image,
    price,
    oldPrice,
    tag,
    couponCode,
  } = req.body;

  const result = await pool.query(
    `INSERT INTO offers
    (title, subtitle, description, image, price, old_price, tag, coupon_code)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
    [title, subtitle, description, image, price, oldPrice, tag, couponCode]
  );

  res.status(201).json(result.rows[0]);
};

/* ---------------------------------
   ADMIN – UPDATE OFFER
---------------------------------- */
export const updateOffer = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query(
    `UPDATE offers
     SET title=$1, subtitle=$2, description=$3, image=$4,
         price=$5, old_price=$6, tag=$7, coupon_code=$8,
         updated_at=NOW()
     WHERE id=$9
     RETURNING *`,
    [...Object.values(req.body), id]
  );

  res.json(result.rows[0]);
};

/* ---------------------------------
   ADMIN – DELETE OFFER
---------------------------------- */
export const deleteOffer = async (req: Request, res: Response) => {
  await pool.query(`DELETE FROM offers WHERE id=$1`, [
    req.params.id,
  ]);
  res.json({ message: "Offer deleted successfully" });
};
