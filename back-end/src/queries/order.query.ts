import { sqlPool } from "../mysqlPool";

export async function createOrderQuery(products: any, userId: any) {
  const productsQuery = products.map((product: any) => {
    let query: string[] = [];
    for (let i = 0; i < product.quantity; i++) {
      query.push(`(${userId},${product.id},${product.size},${product.color})`);
    }
    return query.join(",");
  });
  // @ts-ignore
  const [rows] = await sqlPool.query(
    "INSERT INTO `order` (user_id, product_id, size_id, color_id) VALUES " +
      productsQuery.join(",")
  );
  //@ts-ignore
  return rows;
}
export async function getOrdersQuery(userId: any) {
  // @ts-ignore
  const [rows] = await sqlPool.query(
    "SELECT *, color.name AS color_name, size.name AS size_name FROM `order` JOIN product ON `order`.product_id = product.id JOIN size ON `order`.size_id = size.id JOIN color ON `order`.color_id = color.id WHERE `order`.user_id = ? ",
    [userId]
  );
  console.log(rows);
  //@ts-ignore
  return rows;
}
