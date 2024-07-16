import express from "express";
import {
  authenticateAdminController,
  authenticateController,
} from "../controllers/auth.controller";
import {
  deleteProduct,
  getAllProducts,
  getAllProductsByCategory,
  getProductById,
  getTop_Nth_BestSellers,
  getTop_Nth_BestSellersByBrand,
  getTop_Nth_BestSellersByCategory,
  getTop_Nth_FeaturedProducts,
  productNewCreation,
  productUpdate,
  searchProducts,
} from "../controllers/product.controller";

const router = express.Router();

router.route("/create").post(authenticateAdminController, productNewCreation);
router.route("/update").put(authenticateAdminController, productUpdate);
router
  .route("/get_all_products")
  .post(authenticateAdminController, getAllProducts);
router
  .route("/get_all_products_by_category/:category")
  .post(getAllProductsByCategory);
router.route("/get_product").get(getProductById);
router.route("/get_top_bestsellers/:bestsellers").get(getTop_Nth_BestSellers);
router
  .route("/get_bestsellers_by_category")
  .get(getTop_Nth_BestSellersByCategory);
router
  .route("/get_bestsellers_by_brand/:bestSellers")
  .get(getTop_Nth_BestSellersByBrand);
router.route("/get_featured_products").get(getTop_Nth_FeaturedProducts);
router.route("/delete").post(deleteProduct);
router.route("/search").post(authenticateController, searchProducts);
export default router;
