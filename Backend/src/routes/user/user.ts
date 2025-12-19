import { Router } from "express";
import auth from "../../middlewares/auth";
import { getMyProfile, updateMyProfile, changePassword } from "../../controllers/user/user.controller";

const router = Router();

router.get("/me", auth, getMyProfile);
router.put("/update", auth, updateMyProfile);
router.put("/change-password", auth, changePassword);


export default router;
