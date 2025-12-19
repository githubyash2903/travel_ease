import express from "express";
import {
  getAllUsers,
  getUserRoles,
  getBookingsByUser,
} from "../../controllers/admin/adminUsers.controller";
import { verifyToken } from "../../middlewares/verifyToken";
import { isAdmin } from "../../middlewares/isAdmin";

const router = express.Router();

// 🔐 ADMIN ONLY
router.use(verifyToken, isAdmin);

router.get("/", getAllUsers);
router.get("/roles", getUserRoles);
router.get("/bookings", getBookingsByUser);

export default router;
