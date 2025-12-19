import express from "express";
import {
  searchHotels,
  getHotelById,
  getHotelCities,
  getRoomTypes,
  bookHotel,
} from "../controllers/hotels.controller";

const router = express.Router();

/* SEARCH + FILTER */
router.get("/", searchHotels);

/* DROPDOWNS */
router.get("/cities", getHotelCities);
router.get("/room-types", getRoomTypes);

/* DETAIL */
router.get("/:id", getHotelById);

/* BOOKING */
router.post("/book", bookHotel);

export default router;
