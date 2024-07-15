import express from "express";
import { authenticateAdminController } from "../controllers/auth.controller";
import {
  createFavourite,
  deleteFavourite,
  getFavourites,
} from "../controllers/favourite.controller";

const router = express.Router();

router.route("/create").post(authenticateAdminController, createFavourite);
router.route("/delete").post(authenticateAdminController, deleteFavourite);
router.route("/get_favourites").post(getFavourites);
export default router;
