import { Router } from "express";
import { categories } from "../db/categories";
import { products } from "../db/products";

const router = Router();

router.get("/categories", (_req, res) => {
  const withCounts = categories.map((cat) => ({
    ...cat,
    productCount: products.filter((p) => p.categoryId === cat.id).length,
  }));
  res.json(withCounts);
});

export default router;
