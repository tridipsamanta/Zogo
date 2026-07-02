import { Router } from "express";
import { products } from "../db/products";

const router = Router();

router.get("/products", (req, res) => {
  const {
    category, search, brand, minPrice, maxPrice, minRating,
    inStock, sort, page = "1", limit = "20", featured, flashSale, local,
  } = req.query as Record<string, string>;

  let filtered = [...products];

  if (category) filtered = filtered.filter((p) => p.categoryId === category || p.category.toLowerCase() === category.toLowerCase() || p.slug.includes(category));
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (brand) filtered = filtered.filter((p) => p.brand.toLowerCase().includes(brand.toLowerCase()));
  if (minPrice) filtered = filtered.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  if (minRating) filtered = filtered.filter((p) => p.rating >= Number(minRating));
  if (inStock === "true") filtered = filtered.filter((p) => p.stock > 0);
  if (featured === "true") filtered = filtered.filter((p) => p.isFeatured);
  if (flashSale === "true") filtered = filtered.filter((p) => p.isFlashSale);
  if (local === "true") filtered = filtered.filter((p) => p.isLocal);

  switch (sort) {
    case "price_asc": filtered.sort((a, b) => a.price - b.price); break;
    case "price_desc": filtered.sort((a, b) => b.price - a.price); break;
    case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
    case "discount": filtered.sort((a, b) => b.discount - a.discount); break;
    case "popular": filtered.sort((a, b) => b.reviewCount - a.reviewCount); break;
    default: break;
  }

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const total = filtered.length;
  const totalPages = Math.ceil(total / limitNum);
  const paginated = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  res.json({ products: paginated, total, page: pageNum, limit: limitNum, totalPages });
});

router.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
});

router.get("/products/:id/related", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  const related = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 8);
  res.json(related);
});
router.put("/products/:id", (req, res) => {
  const { id } = req.params;

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  const oldProduct = products[index];

  products[index] = {
    ...oldProduct,
    ...req.body,
    id: oldProduct.id,
    discount: Math.round(
      ((req.body.mrp ?? oldProduct.mrp) -
        (req.body.price ?? oldProduct.price)) /
        (req.body.mrp ?? oldProduct.mrp) *
        100
    ),
  };

  res.json({
    success: true,
    product: products[index],
  });
});
router.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  const deleted = products.splice(index, 1);

  res.json({
    success: true,
    message: "Product deleted successfully",
    product: deleted[0],
  });
});
router.put("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  Object.assign(product, req.body);

  res.json({
    success: true,
    product,
  });
});

router.delete("/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  const deleted = products.splice(index, 1);

  res.json({
    success: true,
    product: deleted[0],
  });
});

export default router;
