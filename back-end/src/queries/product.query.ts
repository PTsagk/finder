import { IProductCreate } from "../interfaces/product.interface";

export async function createNewProductQuery(product: IProductCreate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `CREATE PRODUCT (name, price, image, description, category_id, brand_id) VALUES (?, ?, ?, ?, ?, ?) `,

    [
      product.name,
      product.price,
      product.image,
      product.description,
      product.category_id,
      product.brand_id,
    ]
  );
  //@ts-ignore
  return rows[0];
}
