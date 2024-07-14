import express from "express";
import { createReview, getReviews } from "../controllers/review.controller";
const router = express.Router();

router.route("/:productId").get(getReviews);
router.route("/").post(createReview);

export default router;
