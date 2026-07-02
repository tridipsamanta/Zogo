import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { carts } from "../db/store";
import { products, Product } from "../db/products";

const router = Router();

interface CartItemEnriched {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  totalPrice: number;
}

function buildCart(userId: string) {
  const items = carts.get(userId) || [];
  const cartItems: CartItemEnriched[] = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return {
        productId: item.productId,
        product,
        quantity: item.quantity,
        price: product.price,
        totalPrice: product.price * item.quantity,
      };
    })
    .filter((x): x is CartItemEnriched => x !== null);

  const subtotal = cartItems.reduce((s: number, i: CartItemEnriched) => s + i.totalPrice, 0);
  const discount = cartItems.reduce((s: number, i: CartItemEnriched) => s + (i.product.mrp - i.product.price) * i.quantity, 0);
  const deliveryCharge = subtotal >= 499 ? 0 : subtotal === 0 ? 0 : 40;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryCharge + gst;

  return {
    items: cartItems,
    subtotal,
    discount,
    deliveryCharge,
    gst,
    total,
    coupon: null,
    couponDiscount: 0,
    itemCount: cartItems.reduce((s: number, i: CartItemEnriched) => s + i.quantity, 0),
  };
}

router.get("/cart", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  res.json(buildCart(userId));
});

router.post("/cart/items", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    res.status(400).json({ error: "Invalid product or quantity" });
    return;
  }
  const product = products.find((p) => p.id === productId);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  if (product.stock === 0) {
    res.status(400).json({ error: "Product out of stock" });
    return;
  }

  const items = carts.get(userId) || [];
  const existing = items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, product.stock);
  } else {
    items.push({ productId, quantity: Math.min(quantity, product.stock) });
  }
  carts.set(userId, items);
  res.json(buildCart(userId));
});

router.put("/cart/items/:productId", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 0) {
    res.status(400).json({ error: "Invalid quantity" });
    return;
  }

  let items = carts.get(userId) || [];
  if (quantity === 0) {
    items = items.filter((i) => i.productId !== productId);
  } else {
    const item = items.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  }
  carts.set(userId, items);
  res.json(buildCart(userId));
});

router.delete("/cart/items/:productId", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  const { productId } = req.params;
  const items = (carts.get(userId) || []).filter((i) => i.productId !== productId);
  carts.set(userId, items);
  res.json(buildCart(userId));
});

router.delete("/cart/clear", authMiddleware, (req, res) => {
  const userId = (req as any).user.userId;
  carts.set(userId, []);
  res.json(buildCart(userId));
});

export default router;
