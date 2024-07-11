import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller";

const router = express.Router();

router.route("/get").get(getCategories);
router.route("/create").post(createCategory);
router.route("/update").post(updateCategory);
router.route("/delete").post(deleteCategory);

export default router;
