import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import cartRouter from "./cart";
import ordersRouter from "./orders";
import profileRouter from "./profile";
import wishlistRouter from "./wishlist";
import staticRouter from "./static";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(productsRouter);
router.use(categoriesRouter);
router.use(cartRouter);
router.use(ordersRouter);
router.use(profileRouter);
router.use(wishlistRouter);
router.use(staticRouter);
router.use(adminRouter);

export default router;
