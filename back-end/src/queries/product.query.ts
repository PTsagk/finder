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
export async function getAllProductsByCategoryQuery(category: Category) {
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
    `SELECT *, COUNT(product_id) AS total_orders FROM order 
    GROUP BY product_id ORDER BY total_orders DESC LIMIT ?`,
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
    `SELECT *, COUNT(product_id) AS total_orders FROM order 
    WHERE product_id IN 
    (SELECT id FROM product WHERE category = ?) 
    GROUP BY product_id ORDER BY total_orders DESC LIMIT ?`,
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
    `SELECT *, COUNT(product_id) AS total_orders FROM order 
    WHERE product_id IN 
    (SELECT id FROM product WHERE brand_id = ?) 
    GROUP BY product_id ORDER BY total_orders DESC LIMIT ?`,
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
    `SELECT * FROM product WHERE featured = 1 LIMIT ? ORDER BY id DESC`,
    [featuredNumber]
  );
  //@ts-ignore
  return rows;
}
