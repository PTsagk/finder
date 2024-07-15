import express from "express";
import { authenticateController } from "../controllers/auth.controller";
import {
  createFavourite,
  deleteFavourite,
  getFavourites,
} from "../controllers/favourite.controller";

const router = express.Router();

router.route("/create").post(authenticateController, createFavourite);
router.route("/delete").post(authenticateController, deleteFavourite);
router.route("/get_favourites").post(authenticateController, getFavourites);
export default router;
