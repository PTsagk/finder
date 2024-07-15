import express from "express";
import { authenticateAdminController } from "../controllers/auth.controller";
import {
  createColor,
  deleteColor,
  getColors,
} from "../controllers/color.controller";

const router = express.Router();

router.route("/create").post(authenticateAdminController, createColor);
router.route("/get_favourites").post(getColors);
router.route("/delete").post(authenticateAdminController, deleteColor);
export default router;
