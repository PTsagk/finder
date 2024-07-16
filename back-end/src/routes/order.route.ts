import express from "express";
import { authenticateAdminController } from "../controllers/auth.controller";
import { createOrder } from "../controllers/order.controller";

const router = express.Router();

router.route("/").post(createOrder);

export default router;
