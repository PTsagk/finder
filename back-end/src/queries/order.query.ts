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
  //@ts-ignore
  return rows;
}
export async function getOrdersQuery(userId: any) {
  // @ts-ignore
  const [rows] = await sqlPool.query(
    `
    SELECT 
      o.product_id, 
      product.name AS product_name, 
      product.price AS product_price,
      product.image AS product_image,
      product.description AS product_description,
      product.featured AS product_featured,
      product.brand_id AS product_brand_id,
      product.created_at AS product_created_at,
      product.category AS product_category,
      o.size_id, 
      size.name AS size_name, 
      o.color_id, 
      color.name AS color_name, 
      COUNT(*) AS identical_product_count
    FROM \`order\` o
    JOIN product ON o.product_id = product.id
    JOIN size ON o.size_id = size.id
    JOIN color ON o.color_id = color.id
    WHERE o.user_id = ?
    GROUP BY o.product_id, o.size_id, o.color_id
    `,
    [userId]
  );
  //@ts-ignore
  return rows;
}
