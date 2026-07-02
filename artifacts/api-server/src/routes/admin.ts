import { Router } from "express";
import { adminMiddleware } from "../middleware/auth";
import { products, Product } from "../db/products";
import { orders } from "../db/store";
import { USER_ROLES, users } from "../db/users";

const router = Router();

// Dashboard
router.get("/admin/dashboard", adminMiddleware, (_req, res) => {
  const today = new Date().toDateString();
  const todayOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today,
  );
  const todaySales = todayOrders.reduce((s, o) => s + o.total, 0);
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = users.filter(
    (u) => u.role === USER_ROLES.CUSTOMER,
  ).length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter((o) =>
    ["processing", "confirmed", "packed"].includes(o.status),
  ).length;
  const lowStockProducts = products.filter((p) => p.stock < 20).length;

  const recentOrders = orders
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 10)
    .map((o) => ({ ...o, address: null }));

  const topProducts = products
    .slice()
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8);

  // Generate last 7 days sales chart
  const salesChart = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const label = d.toLocaleDateString("en-IN", { weekday: "short" });
    const dayOrders = orders.filter(
      (o) => new Date(o.createdAt).toDateString() === d.toDateString(),
    );
    const value =
      dayOrders.reduce((s, o) => s + o.total, 0) ||
      Math.floor(Math.random() * 5000 + 1000);
    return { label, value };
  });

  const revenueChart = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const label = d.toLocaleDateString("en-IN", { month: "short" });
    const value = Math.floor(Math.random() * 80000 + 20000);
    return { label, value };
  });

  res.json({
    todaySales,
    todayOrders: todayOrders.length,
    totalRevenue,
    totalOrders,
    totalCustomers,
    totalProducts,
    pendingOrders,
    lowStockProducts,
    recentOrders,
    topProducts,
    salesChart,
    revenueChart,
  });
});

// Products CRUD
router.get("/admin/products", adminMiddleware, (req, res) => {
  const {
    page = "1",
    limit = "20",
    search,
  } = req.query as Record<string, string>;
  let filtered = [...products];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
    );
  }
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const total = filtered.length;
  const totalPages = Math.ceil(total / limitNum);
  const paginated = filtered.slice(
    (pageNum - 1) * limitNum,
    pageNum * limitNum,
  );
  res.json({
    products: paginated,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages,
  });
});

router.post("/admin/products", adminMiddleware, (req, res) => {
  const body = req.body;
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    name: body.name,
    nameBn: body.nameBn || "",
    slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    brand: body.brand,
    category: body.category,
    categoryId: body.categoryId,
    description: body.description || "",
    weight: body.weight || "",
    unit: body.unit || "piece",
    mrp: Number(body.mrp),
    price: Number(body.price || body.mrp),
    discount: Math.round(
      ((body.mrp - (body.price || body.mrp)) / body.mrp) * 100,
    ),
    stock: Number(body.stock || 100),
    images: body.images || [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    ],
    rating: 4.0,
    reviewCount: 0,
    deliveryTime: "30 min",
    tags: body.tags || [],
    isFeatured: !!body.isFeatured,
    isFlashSale: !!body.isFlashSale,
    isLocal: !!body.isLocal,
    isOrganic: !!body.isOrganic,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put("/admin/products/:id", adminMiddleware, (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  const body = req.body;
  Object.assign(product, {
    name: body.name ?? product.name,
    nameBn: body.nameBn ?? product.nameBn,
    brand: body.brand ?? product.brand,
    category: body.category ?? product.category,
    categoryId: body.categoryId ?? product.categoryId,
    description: body.description ?? product.description,
    weight: body.weight ?? product.weight,
    unit: body.unit ?? product.unit,
    mrp: body.mrp ? Number(body.mrp) : product.mrp,
    price: body.price ? Number(body.price) : product.price,
    stock: body.stock !== undefined ? Number(body.stock) : product.stock,
    images: body.images ?? product.images,
    tags: body.tags ?? product.tags,
    isFeatured:
      body.isFeatured !== undefined ? !!body.isFeatured : product.isFeatured,
    isFlashSale:
      body.isFlashSale !== undefined ? !!body.isFlashSale : product.isFlashSale,
    isLocal: body.isLocal !== undefined ? !!body.isLocal : product.isLocal,
  });
  if (product.mrp && product.price) {
    product.discount = Math.round(
      ((product.mrp - product.price) / product.mrp) * 100,
    );
  }
  res.json(product);
});

router.delete("/admin/products/:id", adminMiddleware, (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  products.splice(idx, 1);
  res.json({ message: "Product deleted" });
});

// Orders
router.get("/admin/orders", adminMiddleware, (req, res) => {
  const { status, page = "1" } = req.query as Record<string, string>;
  let filtered = [...orders];
  if (status) filtered = filtered.filter((o) => o.status === status);
  filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const pageNum = Math.max(1, Number(page));
  const limitNum = 20;
  const paginated = filtered.slice(
    (pageNum - 1) * limitNum,
    pageNum * limitNum,
  );
  res.json(paginated.map((o) => ({ ...o, address: null })));
});

router.patch("/admin/orders/:id", adminMiddleware, (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  const { status, message } = req.body;
  const now = new Date().toISOString();
  order.status = status;
  order.updatedAt = now;
  order.timeline.push({
    status,
    timestamp: now,
    message: message || `Order ${status}`,
  });
  res.json({ ...order, address: null });
});

// Customers
router.get("/admin/customers", adminMiddleware, (req, res) => {
  const { search, page = "1" } = req.query as Record<string, string>;
  let filtered = users.filter((u) => u.role === USER_ROLES.CUSTOMER);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q),
    );
  }
  const pageNum = Math.max(1, Number(page));
  const limitNum = 20;
  const paginated = filtered.slice(
    (pageNum - 1) * limitNum,
    pageNum * limitNum,
  );
  res.json(paginated.map(({ passwordHash, isBlocked, ...u }) => u));
});

// Analytics
router.get("/admin/analytics", adminMiddleware, (req, res) => {
  const { period = "7d" } = req.query as Record<string, string>;

  const days = period === "30d" ? 30 : period === "12m" ? 365 : 7;
  const points = period === "12m" ? 12 : days;

  const salesData = Array.from({ length: points }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (points - 1 - i));
    const label =
      period === "12m"
        ? d.toLocaleDateString("en-IN", { month: "short" })
        : d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    const dayOrders = orders.filter((o) => {
      const od = new Date(o.createdAt);
      return od.toDateString() === d.toDateString();
    });
    const value =
      dayOrders.reduce((s, o) => s + o.total, 0) ||
      Math.floor(Math.random() * 8000 + 2000);
    return { label, value };
  });

  const revenueData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const label = d.toLocaleDateString("en-IN", { month: "short" });
    const value = Math.floor(Math.random() * 100000 + 30000);
    return { label, value };
  });

  const categoryPerformance = [
    { category: "Vegetables", sales: 45000, percentage: 22 },
    { category: "Fish", sales: 38000, percentage: 18 },
    { category: "Dairy & Milk", sales: 32000, percentage: 15 },
    { category: "Chicken", sales: 28000, percentage: 13 },
    { category: "Rice", sales: 22000, percentage: 10 },
    { category: "Others", sales: 46000, percentage: 22 },
  ];

  res.json({
    salesData,
    revenueData,
    categoryPerformance,
    averageOrderValue: 485,
    returningCustomers: 68,
    totalRevenue: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((s, o) => s + o.total, 0),
  });
});

export default router;
