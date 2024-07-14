import express from "express";
import { authenticateAdminController } from "../controllers/auth.controller";
import {
  createColor,
  deleteColor,
  getColors,
  updateColor,
} from "../controllers/color.controller";

const router = express.Router();

router.route("/create").post(authenticateAdminController, createColor);
router.route("/update").put(authenticateAdminController, updateColor);
router.route("/get_colors").post(getColors);
router.route("/delete").post(authenticateAdminController, deleteColor);
export default router;
