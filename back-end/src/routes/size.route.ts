import express from "express";
import { authenticateAdminController } from "../controllers/auth.controller";
import {
  createSize,
  deleteSize,
  getSizes,
  updateSize,
} from "../controllers/size.controller";

const router = express.Router();

router.route("/create").post(authenticateAdminController, createSize);
router.route("/update").put(authenticateAdminController, updateSize);
router.route("/get_sizes").post(getSizes);
router.route("/delete").post(authenticateAdminController, deleteSize);
export default router;
