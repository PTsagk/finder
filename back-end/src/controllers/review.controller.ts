import { Request, Response } from "express";
import { sqlPool } from "../mysqlPool";
import {
  createNewReview,
  getReviewsByProductId,
} from "../queries/review.query";

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = await createNewReview(req.body);
    if (!review) {
      throw new Error("Something went wrong");
    }
    res.json("OK").status(200);
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error").status(500);
  }
};

export const getReviewsForAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const parsedProductId = parseInt(productId);
    const reviews = await getReviewsByProductId(parsedProductId);
    res.json(reviews);
  } catch (error) {
    res.json("Internal Server Error").status(500);
  }
};
