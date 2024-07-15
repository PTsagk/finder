import { Product } from "../models/product.model";
import { sqlPool } from "../mysqlPool";

export async function createFavourite(product: Product) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `INSERT INTO favorite_product (product_id,user_id) VALUES (?,?) `,

    [color.name]
  );
  const [newColor] = await sqlPool.query(
    "SELECT * FROM color WHERE id = LAST_INSERT_ID()"
  );
  //@ts-ignore
  return newColor[0];
}
