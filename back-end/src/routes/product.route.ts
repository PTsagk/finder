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

router.route("/create").post(authenticateController, productNewCreation);
router.route("/update").put(authenticateController, productUpdate);
router.route("/get_all_products").get(getAllProducts);
router.route("/get_all_products_by_category").get(getAllProductsByCategory);
router.route("/get_product").get(getProductById);
router.route("/get_top_bestsellers").get(getTop_Nth_BestSellers);
router
  .route("/get_bestsellers_by_category")
  .get(getTop_Nth_BestSellersByCategory);
router.route("/get_bestsellers_by_brand").get(getTop_Nth_BestSellersByBrand);
router.route("/get_featured_products").get(getTop_Nth_FeaturedProducts);
export default router;
