import express from "express";
import { authenticateAdminController } from "../controllers/auth.controller";
import {
  createBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../controllers/brand.controller";

const router = express.Router();

router.route("/create").post(createBrand);
router.route("/get_brands").post(getBrands);
router.route("/update").put(authenticateAdminController, updateBrand);
router.route("/delete").post(authenticateAdminController, deleteBrand);

export default router;
