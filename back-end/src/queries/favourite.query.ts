import { IFavouriteCreate } from "../interfaces/favourite.interface";
import { User } from "../models/user.model";
import { sqlPool } from "../mysqlPool";

export async function createFavouriteQuery(params: IFavouriteCreate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `INSERT INTO favorite_product (product_id,user_id) VALUES (?,?) `,

    [params.product.id, params.user.id]
  );

  //@ts-ignore
  return rows;
}

export async function deleteFavouriteQuery(params: IFavouriteCreate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `DELETE FROM favorite_product WHERE product_id = ? AND user_id = ?`,

    [params.product.id, params.user.id]
  );

  //@ts-ignore
  return rows;
}

export async function getFavouritesByUserQuery(userId: number) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `SELECT * FROM favorite_product JOIN product ON favorite_product.product_id = product.id WHERE user_id = ?`,

    [userId]
  );

  console.log(rows);
  //@ts-ignore
  return rows;
}
