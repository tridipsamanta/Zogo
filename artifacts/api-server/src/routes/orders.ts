import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { orders, carts, nextOrderNumber, Order } from "../db/store";
import { products } from "../db/products";
import { USER_ROLES, addresses } from "../db/users";
import { coupons } from "../db/static";

const router = Router();

function sanitizeOrder(order: Order, userId: string) {
  const addr = addresses.find((a) => a.id === order.addressId);
  return { ...order, address: addr || null };
}

router.get("/orders", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const userOrders = orders
    .filter((o) => o.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .map((o) => sanitizeOrder(o, userId));
  res.json(userOrders);
});

router.get("/orders/:id", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const role = (req as any).user.role;
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  if (order.userId !== userId && role !== USER_ROLES.SUPER_ADMIN) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  res.json(sanitizeOrder(order, userId));
});

router.post("/orders", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const { addressId, paymentMethod, deliverySlot, couponCode, notes } =
    req.body;

  const address = addresses.find((a) => a.id === addressId);
  if (!address) {
    res.status(400).json({ error: "Address not found" });
    return;
  }

  const cartItems = carts.get(userId) || [];
  if (cartItems.length === 0) {
    res.status(400).json({ error: "Cart is empty" });
    return;
  }

  const orderItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return {
      productId: item.productId,
      name: product.name,
      image: product.images[0],
      quantity: item.quantity,
      price: product.price,
      totalPrice: product.price * item.quantity,
    };
  });

  const subtotal = orderItems.reduce((s, i) => s + i.totalPrice, 0);
  const deliveryCharge = subtotal >= 499 ? 0 : 40;
  const gst = Math.round(subtotal * 0.05);

  let couponDiscount = 0;
  if (couponCode) {
    const coupon = coupons.find((c) => c.code === couponCode && c.isActive);
    if (coupon && subtotal >= coupon.minOrder) {
      couponDiscount =
        coupon.type === "flat"
          ? Math.min(coupon.discount, coupon.maxDiscount)
          : Math.min((subtotal * coupon.discount) / 100, coupon.maxDiscount);
    }
  }

  const total = subtotal + deliveryCharge + gst - couponDiscount;
  const now = new Date().toISOString();
  const estimated = new Date(Date.now() + 30 * 60000).toISOString();

  const order: Order = {
    id: `ord-${userId}-${Date.now()}`,
    orderNumber: nextOrderNumber(),
    userId,
    items: orderItems,
    addressId,
    status: "processing",
    paymentMethod,
    paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
    subtotal,
    discount: 0,
    deliveryCharge,
    gst,
    couponDiscount,
    total,
    deliverySlot,
    estimatedDelivery: estimated,
    createdAt: now,
    updatedAt: now,
    timeline: [
      {
        status: "processing",
        timestamp: now,
        message: "Order placed successfully",
      },
    ],
    notes,
  };

  orders.push(order);
  carts.set(userId, []);

  // Simulate quick confirmation
  setTimeout(() => {
    const o = orders.find((x) => x.id === order.id);
    if (o && o.status === "processing") {
      o.status = "confirmed";
      o.updatedAt = new Date().toISOString();
      o.timeline.push({
        status: "confirmed",
        timestamp: o.updatedAt,
        message: "Order confirmed by ZOGO",
      });
    }
  }, 5000);

  res.status(201).json(sanitizeOrder(order, userId));
});

router.patch("/orders/:id/cancel", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  if (order.userId !== userId) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  if (!["processing", "confirmed"].includes(order.status)) {
    res.status(400).json({ error: "Order cannot be cancelled at this stage" });
    return;
  }
  const now = new Date().toISOString();
  order.status = "cancelled";
  order.updatedAt = now;
  order.timeline.push({
    status: "cancelled",
    timestamp: now,
    message: "Order cancelled by customer",
  });
  res.json(sanitizeOrder(order, userId));
});

export default router;
