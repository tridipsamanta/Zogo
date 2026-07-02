import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { users, addresses, Address } from "../db/users";

const router = Router();

function sanitizeUser(user: (typeof users)[0]) {
  const { passwordHash, isBlocked, ...rest } = user;
  return rest;
}

router.get("/profile", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const user = users.find((u) => u.id === userId);
  if (!user) { res.status(404).json({ error: "User not found" }); return; }
  res.json(sanitizeUser(user));
});

router.put("/profile", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const user = users.find((u) => u.id === userId);
  if (!user) { res.status(404).json({ error: "User not found" }); return; }
  const { name, phone, avatar } = req.body;
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (avatar !== undefined) user.avatar = avatar;
  res.json(sanitizeUser(user));
});

router.get("/profile/addresses", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  res.json(addresses.filter((a) => a.userId === userId));
});

router.post("/profile/addresses", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const { label, name, phone, line1, line2, city, district, state, pincode, isDefault } = req.body;
  if (!label || !name || !phone || !line1 || !city || !district || !state || !pincode) {
    res.status(400).json({ error: "All required fields must be provided" });
    return;
  }
  if (isDefault) {
    addresses.filter((a) => a.userId === userId).forEach((a) => { a.isDefault = false; });
  }
  const newAddr: Address = {
    id: `addr-${Date.now()}`,
    userId,
    label, name, phone, line1,
    line2: line2 || null,
    city, district, state, pincode,
    isDefault: !!isDefault,
  };
  addresses.push(newAddr);
  res.status(201).json(newAddr);
});

router.put("/profile/addresses/:id", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const addr = addresses.find((a) => a.id === req.params.id && a.userId === userId);
  if (!addr) { res.status(404).json({ error: "Address not found" }); return; }
  const { label, name, phone, line1, line2, city, district, state, pincode, isDefault } = req.body;
  if (isDefault) {
    addresses.filter((a) => a.userId === userId).forEach((a) => { a.isDefault = false; });
  }
  Object.assign(addr, { label, name, phone, line1, line2: line2 || null, city, district, state, pincode, isDefault: !!isDefault });
  res.json(addr);
});

router.delete("/profile/addresses/:id", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const idx = addresses.findIndex((a) => a.id === req.params.id && a.userId === userId);
  if (idx === -1) { res.status(404).json({ error: "Address not found" }); return; }
  addresses.splice(idx, 1);
  res.json({ message: "Address deleted" });
});

export default router;
