import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { wishlists } from "../db/store";
import { products } from "../db/products";

const router = Router();

router.get("/wishlist", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const items = wishlists.filter((w) => w.userId === userId);
  const wishlistProducts = items
    .map((w) => products.find((p) => p.id === w.productId))
    .filter(Boolean);
  res.json(wishlistProducts);
});

router.post("/wishlist", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const { productId } = req.body;
  if (!productId) { res.status(400).json({ error: "productId required" }); return; }
  const exists = wishlists.find((w) => w.userId === userId && w.productId === productId);
  if (!exists) {
    wishlists.push({ userId, productId });
  }
  res.json({ message: "Added to wishlist" });
});

router.delete("/wishlist/:productId", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const { productId } = req.params;
  const idx = wishlists.findIndex((w) => w.userId === userId && w.productId === productId);
  if (idx !== -1) wishlists.splice(idx, 1);
  res.json({ message: "Removed from wishlist" });
});

export default router;
