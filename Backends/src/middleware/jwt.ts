import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysecret123";

export interface AuthRequest extends Request {
  userId?: string;
  email?: string;
}

export default function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid Authorization format" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
        if (payload.role !== 'user') {
      return res.status(403).json({ message: "Access denied. Users only." });
    }
    req.userId = payload.userId;
    req.email = payload.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}


export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {

  const header = req.headers.authorization;
  // console.log("Auth Header:", header);
  if (!header) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid Authorization format" });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    console.log("Decoded Payload:", payload);
    if (payload.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    req.userId = payload.userId;
    req.email = payload.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};