import express from "express";
import { createReview } from "../controllers/review.controller";
const router = express.Router();

router.route("/review").post(createReview);

export default router;
