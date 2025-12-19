import express  from "express";
import auth from '../middleware/jwt';
import { changePassword, deleteMyAccount, getMyProfile, updateMyProfile } from '../controller/user/logincontroller';
import { getFlightsByRoute } from "../controller/admin/flightController";





const router = express.Router();

// user profile route
router.get("/get-profile",auth,getMyProfile)
router.post("/update-profile",auth,updateMyProfile)
router.post("/update-password",auth,changePassword)
router.delete("/delete-account",auth,deleteMyAccount)

router.get("/search-flights",getFlightsByRoute)

export default router;