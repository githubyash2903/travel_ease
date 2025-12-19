import express  from "express";
import { getAllUsers, getUserById, deleteUser, deactivateUser } from "../controller/admin/userController";
import { getPlatformSettings, createPlatformSettings, updatePlatformSettings } from "../controller/admin/platformSettingController";
import { authenticateAdmin } from "../middleware/jwt";
import { upload  } from "../config/multer";
import { createFlight, getAllFlights, updateFlight, deleteFlight, getFlightsByRoute } from "../controller/admin/flightController";


const router = express.Router();
// Admin routes for user management
router.get("/users",authenticateAdmin, getAllUsers);
router.get("/users/:id", authenticateAdmin, getUserById);
router.delete("/users/:id", authenticateAdmin, deleteUser);
router.post("/users/deactivate",authenticateAdmin,  deactivateUser);

// Platform settings routes 
router.get("/platform-settings", authenticateAdmin, getPlatformSettings);
router.post("/platform-settings", authenticateAdmin, upload.single('logo'), updatePlatformSettings);

// flight routes
router.post("/flights", authenticateAdmin, createFlight);
router.get("/flights", authenticateAdmin, getAllFlights);
router.post("/flights/:id", authenticateAdmin, updateFlight);
router.delete("/flights/:id", authenticateAdmin, deleteFlight);

export default router;