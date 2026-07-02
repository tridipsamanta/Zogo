import { Router } from "express";
import { banners, offers, coupons } from "../db/static";

const router = Router();

router.get("/banners", (_req, res) => {
  res.json(banners);
});

router.get("/offers", (_req, res) => {
  res.json(offers);
});

router.post("/coupons/validate", (req, res) => {
  const { code, orderTotal } = req.body;
  if (!code) { res.status(400).json({ error: "Coupon code required" }); return; }

  const coupon = coupons.find((c) => c.code === code.toUpperCase() && c.isActive);
  if (!coupon) {
    res.status(404).json({ error: "Invalid coupon code" });
    return;
  }
  if (orderTotal < coupon.minOrder) {
    res.status(400).json({ error: `Minimum order of ₹${coupon.minOrder} required for this coupon` });
    return;
  }

  const discountAmount = coupon.type === "flat"
    ? Math.min(coupon.discount, coupon.maxDiscount)
    : Math.min((orderTotal * coupon.discount) / 100, coupon.maxDiscount);

  res.json({
    id: coupon.id,
    code: coupon.code,
    discount: discountAmount,
    type: coupon.type,
    minOrder: coupon.minOrder,
    maxDiscount: coupon.maxDiscount,
    description: coupon.description,
    isValid: true,
  });
});

export default router;
