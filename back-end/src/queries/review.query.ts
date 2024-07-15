import { sqlPool } from "../mysqlPool";

export async function createNewReview(review: any) {
  // const today = new Date();
  // const yyyy = today.getFullYear();
  // const mm = today.getMonth() + 1; // Months start at 0!
  // const dd = today.getDate();

  const [rows] = await sqlPool.query(
    `INSERT INTO review (description, product_id, user_id,score) VALUES ( ?, ?, ?, ?) `,

    [review.description, review.product_id, review.user_id, review.score]
  );
  //@ts-ignore
  return rows;
}

export async function getReviewsByProductId(productId: number) {
  const [rows]: any = await sqlPool.query(
    `SELECT r.*
      FROM review r
      INNER JOIN user ON r.user_id=user.id AND r.product_id = ? 
      ORDER BY date DESC`,
    [productId]
  );
  console.log(rows);
  const [reviews_stats]: any = await sqlPool.query(
    `SELECT AVG(score) AS avg_score, COUNT(score) AS number_of_reviews FROM review WHERE product_id = ? GROUP BY product_id`,
    [productId]
  );

  if (
    reviews_stats[0] &&
    reviews_stats[0].avg_score !== null &&
    reviews_stats[0].number_of_reviews !== null
  ) {
    return { reviews: rows, stats: reviews_stats };
  }
  return rows[0];
}
