import { Request, Response } from "express";
import { sqlPool } from "../mysqlPool";

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = await createNewReview(req.body);
    if (!review) {
      throw new Error("Something went wrong");
    }
    res.json("OK").status(200);
  } catch (error) {
    res.json("Internal Server Error").status(500);
  }
};

async function createNewReview(review: any) {
  const [rows] = await sqlPool.query(
    `INSERT INTO user (score, description, product_id, user_id) VALUES ( ?, ?, ?, ?) `,

    [review.score, review.description, review.product_id, review.user_id]
  );
  //@ts-ignore
  return rows[0];
}
