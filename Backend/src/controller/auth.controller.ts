import { Request, Response, NextFunction } from 'express';
import { loginSchema, registerSchema } from '../validation/auth.schema';
import { loginUser, registerAdmin, registerUser } from '../service/auth.service';
import { success } from '../utils/response';


export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = registerSchema.parse(req.body);
    const user = await registerUser(payload);
    return success(res, user, 'User registered');
  } catch (err) {
    next(err);
  }
}
export async function registerAdminController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = registerSchema.parse(req.body);
    const user = await registerAdmin(payload);
    return success(res, user, 'Admin registered');
  } catch (err) {
    next(err);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = loginSchema.parse(req.body);
    const token = await loginUser(payload);
    return success(res, token, 'Login successful');
  } catch (err) {
    next(err);
  }
}
