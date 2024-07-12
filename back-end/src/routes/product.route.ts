import express from "express";
import { authenticateController } from "../controllers/auth.controller";
import {
  productNewCreation,
  productUpdate,
  getAllProducts,
  getAllProductsByCategory,
  getProductById,
  getTop_Nth_BestSellers,
  getTop_Nth_BestSellersByBrand,
  getTop_Nth_BestSellersByCategory,
  getTop_Nth_FeaturedProducts,
} from "../controllers/product.controller";

const router = express.Router();

export default router;
