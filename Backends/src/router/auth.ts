import { Router } from "express";
import { loginUser, registerUser } from "../controller/user/logincontroller";
import { loginSchema, registerSchema } from "../validation/authValidation";
import { validateRequest } from "../middleware/validate";

const router = Router();

// Authentication routes
router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);

export default router;