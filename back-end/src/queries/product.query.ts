import { IProductCreate } from "../interfaces/product.interface";
import { Category } from "../models/category.model";
import { sqlPool } from "../mysqlPool";

export async function createNewProductQuery(product: IProductCreate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `CREATE PRODUCT (name, price, image, description, category_id, brand_id) VALUES (?, ?, ?, ?, ?, ?) `,

    [
      product.name,
      product.price,
      product.image,
      product.description,
      product.category,
      product.brand_id,
    ]
  );
  //@ts-ignore
  return rows[0];
}

export async function updateProductQuery(product: IProductCreate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `UPDATE product SET name = ?, price = ?, image = ?, description = ?, category_id = ?, brand_id = ? WHERE id = ?`,

    [
      product.name,
      product.price,
      product.image,
      product.description,
      product.category,
      product.brand_id,
      product.id,
    ]
  );
  //@ts-ignore
  return rows[0];
}

export async function getAllProductsQuery() {
  // @ts-ignore
  const [rows] = await sqlPool.query(`SELECT * FROM product`);

  //@ts-ignore
  return rows;
}
export async function getAllProductsByCategoryQuery(category: string) {
  // @ts-ignore
  const [rows] = await sqlPool.query(
    `SELECT * FROM product WHERE category = ?`,
    [category]
  );
}

export async function getProductByIdQuery(id: number) {
  // @ts-ignore
  const [rows] = await sqlPool.query(`SELECT * FROM product WHERE id = ?`, [
    id,
  ]);
  //@ts-ignore
  return rows[0];
}
export async function getTop_Nth_BestSellersQuery(bestsellers: number = 3) {
  // @ts-ignore
  const [rows] = await sqlPool.query(
    `WITH order_counts AS (
    SELECT o.product_id, COUNT(o.product_id) AS total_orders
    FROM finder.order o
    GROUP BY o.product_id
        ORDER BY total_orders DESC
        LIMIT ?
    )
    SELECT p.*, oc.total_orders
    FROM finder.product p
    JOIN order_counts oc ON p.id = oc.product_id;`,
    [bestsellers]
  );

  //@ts-ignore
  return rows;
}

export async function getTop_Nth_BestSellersByCategoryQuery(
  category: Category,
  bestsellers: number = 3
) {
  // @ts-ignore
  const [rows] = await sqlPool.query(
    `WITH order_counts AS (
    SELECT o.product_id, COUNT(o.product_id) AS total_orders
    FROM finder.order o
    WHERE o.product_id IN 
        (SELECT p.id FROM product p WHERE p.category= ?)
    GROUP BY o.product_id
    ORDER BY total_orders DESC
    LIMIT ?
)
SELECT p.*, oc.total_orders
FROM finder.product p
JOIN order_counts oc ON p.id = oc.product_id;
`,
    [category, bestsellers]
  );

  //@ts-ignore
  return rows;
}
export async function getTop_Nth_BestSellersByBrandQuery(
  brand_id: number,
  bestsellers: number = 3
) {
  // @ts-ignore
  const [rows] = await sqlPool.query(
    `WITH order_counts AS (
    SELECT o.product_id, COUNT(o.product_id) AS total_orders
    FROM finder.order o
    WHERE o.product_id IN 
        (SELECT p.id FROM product p WHERE p.brand_id = ?)
    GROUP BY o.product_id
    ORDER BY total_orders DESC
    LIMIT ?
    )
    SELECT p.*, oc.total_orders
    FROM finder.product p
    JOIN order_counts oc ON p.id = oc.product_id;`,
    [brand_id, bestsellers]
  );
  //@ts-ignore
  return rows;
}

export async function getTop_Nth_FeaturedProductsQuery(
  featuredNumber: number = 3
) {
  // @ts-ignore
  const [rows] = await sqlPool.query(
    `SELECT * FROM product WHERE featured = 1 ORDER BY id DESC LIMIT ?`,
    [featuredNumber]
  );
  //@ts-ignore
  return rows;
}
