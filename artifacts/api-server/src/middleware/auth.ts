import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { USER_ROLES } from "../db/users";

const JWT_SECRET = process.env.SESSION_SECRET || "zogo-secret-key-2024";

export interface JWTPayload {
  userId: string;
  role: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  authMiddleware(req, res, () => {
    if ((req as any).user?.role !== USER_ROLES.SUPER_ADMIN) {
      res.status(403).json({ error: "Admin access required" });
      return;
    }
    next();
  });
}

export function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
      (req as any).user = payload;
    } catch {
      // ignore invalid token
    }
  }
  next();
}
