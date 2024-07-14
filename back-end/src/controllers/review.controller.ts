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
    console.log(error);
    res.json("Internal Server Error").status(500);
  }
};

async function createNewReview(review: any) {
  // const today = new Date();
  // const yyyy = today.getFullYear();
  // const mm = today.getMonth() + 1; // Months start at 0!
  // const dd = today.getDate();
  const formattedToday = Date.now();
  const [rows] = await sqlPool.query(
    `INSERT INTO review (description, product_id, user_id,score,date) VALUES ( ?, ?, ?, ?, ?) `,

    [
      review.description,
      review.product_id,
      review.user_id,
      review.score,
      formattedToday,
    ]
  );
  //@ts-ignore
  return rows;
}

export const getReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const [rows]: any = await sqlPool.query(
      `SELECT * 
      FROM review
      INNER JOIN user ON review.user_id=user.id AND review.product_id = ? ORDER BY date DESC`,
      [productId]
    );
    if (!rows[0]) {
      throw new Error("Something went wrong");
    }
    res.json(rows).status(200);
  } catch (error) {
    res.json("Internal Server Error").status(500);
  }
};
