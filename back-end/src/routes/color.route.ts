import express from "express";
import { authenticateAdminController } from "../controllers/auth.controller";
import {
  getColors,
  deleteColor,
  createColor,
  updateColor,
} from "../controllers/color.controller";

const router = express.Router();

router.route("/create").post(authenticateAdminController, createColor);
router.route("/update").put(authenticateAdminController, updateColor);
router.route("/get_all_colors").get(authenticateAdminController, getColors);
router.route("/delete").post(deleteColor);
export default router;
