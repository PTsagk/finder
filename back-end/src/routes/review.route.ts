import express from "express";
import {
  createReview,
  getReviewsForAProduct,
} from "../controllers/review.controller";
const router = express.Router();

router.route("/:productId").get(getReviewsForAProduct);
router.route("/").post(createReview);

export default router;
