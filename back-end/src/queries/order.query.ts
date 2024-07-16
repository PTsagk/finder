import { sqlPool } from "../mysqlPool";

export async function createOrderQuery(products: any, userId: any) {
  const productsQuery = products.map((product: any) => {
    return `(${userId},${product.id},${product.size},${product.color})`;
  });
  console.log(productsQuery);
  // @ts-ignore
  const [rows] = await sqlPool.query(
    "INSERT INTO `order` (user_id, product_id, size_id, color_id) VALUES " +
      productsQuery.join(",")
  );
  console.log(rows, productsQuery);
  //@ts-ignore
  return rows;
}
