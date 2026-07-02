import { Router } from "express";
import { USER_ROLES, users, verifyPassword, hashPwd } from "../db/users";
import { generateToken, authMiddleware } from "../middleware/auth";

const router = Router();

function sanitizeUser(user: (typeof users)[0]) {
  const { passwordHash, isBlocked, ...rest } = user;
  return rest;
}

router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
    return;
  }
  const user = users.find((u) => u.email === email.toLowerCase());
  if (!user || !verifyPassword(password, user.passwordHash)) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  if (user.isBlocked) {
    res.status(403).json({ error: "Account is blocked" });
    return;
  }
  const token = generateToken({ userId: user.id, role: user.role });
  res.json({ token, user: sanitizeUser(user) });
});

router.post("/auth/signup", (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    res.status(400).json({ error: "All fields required" });
    return;
  }
  if (users.find((u) => u.email === email.toLowerCase())) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }
  const newUser = {
    id: `u-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    phone,
    avatar: null,
    role: USER_ROLES.CUSTOMER,
    passwordHash: hashPwd(password),
    createdAt: new Date().toISOString(),
    totalOrders: 0,
    totalSpent: 0,
    isBlocked: false,
  };
  users.push(newUser);
  const token = generateToken({ userId: newUser.id, role: newUser.role });
  res.status(201).json({ token, user: sanitizeUser(newUser) });
});

router.post("/auth/logout", (_req, res) => {
  res.json({ message: "Logged out successfully" });
});

router.get("/auth/me", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(sanitizeUser(user));
});

export default router;
