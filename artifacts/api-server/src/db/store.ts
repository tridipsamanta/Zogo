// In-memory store for mutable data
export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderTimeline {
  status: string;
  timestamp: string;
  message: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }[];
  addressId: string;
  status:
    | "processing"
    | "confirmed"
    | "packed"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  gst: number;
  couponDiscount: number;
  total: number;
  deliverySlot: string;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimeline[];
  notes?: string;
}

export interface WishlistItem {
  userId: string;
  productId: string;
}

// In-memory stores
export const carts = new Map<string, CartItem[]>();
export const orders: Order[] = [];
export const wishlists: WishlistItem[] = [];

let orderCounter = 1001;

export function nextOrderNumber(): string {
  return `ZOGO${String(orderCounter++).padStart(6, "0")}`;
}

// Seed some initial orders
import { USER_ROLES, users } from "./users";
import { products } from "./products";

function seedOrders() {
  const statuses: Order["status"][] = [
    "delivered",
    "delivered",
    "delivered",
    "out_for_delivery",
    "processing",
    "cancelled",
  ];
  const payments = ["COD", "UPI", "Credit Card"];
  const slots = [
    "Express (20-30 min)",
    "Morning (9AM-12PM)",
    "Evening (5PM-8PM)",
  ];

  const sampleProducts = products.slice(0, 20);

  users
    .filter((u) => u.role === USER_ROLES.CUSTOMER)
    .forEach((user, ui) => {
      const orderCount = Math.min(user.totalOrders, 5);
      for (let i = 0; i < orderCount; i++) {
        const now = new Date();
        const daysAgo = Math.floor(Math.random() * 60);
        const createdAt = new Date(
          now.getTime() - daysAgo * 24 * 3600 * 1000,
        ).toISOString();
        const status = statuses[(ui + i) % statuses.length];
        const paymentMethod = payments[(ui + i) % payments.length];

        const orderItems = sampleProducts
          .slice(i % 5, (i % 5) + 3)
          .map((prod) => ({
            productId: prod.id,
            name: prod.name,
            image: prod.images[0],
            quantity: Math.floor(Math.random() * 3) + 1,
            price: prod.price,
            totalPrice: prod.price * (Math.floor(Math.random() * 3) + 1),
          }));

        const subtotal = orderItems.reduce((s, it) => s + it.totalPrice, 0);
        const deliveryCharge = subtotal >= 499 ? 0 : 40;
        const gst = Math.round(subtotal * 0.05);
        const total = subtotal + deliveryCharge + gst;

        const timeline: OrderTimeline[] = [
          {
            status: "processing",
            timestamp: createdAt,
            message: "Order placed successfully",
          },
        ];
        if (status !== "processing") {
          timeline.push({
            status: "confirmed",
            timestamp: new Date(
              new Date(createdAt).getTime() + 5 * 60000,
            ).toISOString(),
            message: "Order confirmed by ZOGO",
          });
        }
        if (["packed", "out_for_delivery", "delivered"].includes(status)) {
          timeline.push({
            status: "packed",
            timestamp: new Date(
              new Date(createdAt).getTime() + 15 * 60000,
            ).toISOString(),
            message: "Your order is being packed",
          });
        }
        if (["out_for_delivery", "delivered"].includes(status)) {
          timeline.push({
            status: "out_for_delivery",
            timestamp: new Date(
              new Date(createdAt).getTime() + 20 * 60000,
            ).toISOString(),
            message: "Our delivery partner is on the way",
          });
        }
        if (status === "delivered") {
          timeline.push({
            status: "delivered",
            timestamp: new Date(
              new Date(createdAt).getTime() + 35 * 60000,
            ).toISOString(),
            message: "Order delivered successfully!",
          });
        }
        if (status === "cancelled") {
          timeline.push({
            status: "cancelled",
            timestamp: new Date(
              new Date(createdAt).getTime() + 10 * 60000,
            ).toISOString(),
            message: "Order cancelled",
          });
        }

        orders.push({
          id: `ord-${user.id}-${i}`,
          orderNumber: `ZOGO${String(orderCounter++).padStart(6, "0")}`,
          userId: user.id,
          items: orderItems,
          addressId: user.id === "u-001" ? "addr-001" : `addr-${ui}`,
          status,
          paymentMethod,
          paymentStatus: status === "cancelled" ? "failed" : "paid",
          subtotal,
          discount: 0,
          deliveryCharge,
          gst,
          couponDiscount: 0,
          total,
          deliverySlot: slots[i % slots.length],
          estimatedDelivery: new Date(
            new Date(createdAt).getTime() + 30 * 60000,
          ).toISOString(),
          createdAt,
          updatedAt: timeline[timeline.length - 1].timestamp,
          timeline,
        });
      }
    });
}

seedOrders();
