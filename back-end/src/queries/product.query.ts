import { IProductCreate } from "../interfaces/product.interface";
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { sqlPool } from "../mysqlPool";
import {
  CommonNoMeaningWords,
  ProfunityBadBoySlappySlapWords,
  StinkyGoofyAhhIrrelevantSkibidiToiletWords,
} from "../SetOfWeirdWords/weirdStinkyWordsSet";

export async function createNewProductQuery(product: IProductCreate) {
  // @ts-ignore

  const [rows]: any = await sqlPool.query(
    `INSERT INTO product (name, price, image, description, category, brand_id) VALUES (?, ?, ?, ?, ?, ?)`,

    [
      product.name,
      product.price,
      product.image,
      product.description,
      product.category,
      product.brand_id,
    ]
  );

  let productColorQuery = "";
  product.color_ids.forEach((colorId) => {
    productColorQuery += `(${rows.insertId},${colorId}),`;
  });
  await sqlPool.query(
    `INSERT INTO product_color (product_id,color_id) VALUES ${productColorQuery.slice(
      0,
      -1
    )}`
  );

  let productSizeQuery = "";
  product.size_ids.forEach((sizeId) => {
    productSizeQuery += `(${rows.insertId},${sizeId}),`;
  });
  await sqlPool.query(
    `INSERT INTO product_size (product_id,size_id) VALUES ${productSizeQuery.slice(
      0,
      -1
    )}`
  );

  //@ts-ignore
  return rows[0];
}

export async function updateProductQuery(product: IProductCreate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `UPDATE product SET name = ?, price = ?, image = ?, description = ?, category = ?, brand_id = ?, featured = ? WHERE id = ?`,

    [
      product.name,
      product.price,
      product.image,
      product.description,
      product.category,
      product.brand_id,
      product.featured,
      product.id,
    ]
  );

  await sqlPool.query(`DELETE FROM product_color WHERE product_id = ?`, [
    product.id,
  ]);

  let productColorQuery = "";
  product.color_ids.forEach((colorId) => {
    productColorQuery += `(${product.id},${colorId}),`;
  });
  await sqlPool.query(
    `INSERT INTO product_color (product_id,color_id) VALUES ${productColorQuery.slice(
      0,
      -1
    )}`
  );

  await sqlPool.query(`DELETE FROM product_size WHERE product_id = ?`, [
    product.id,
  ]);

  let productSizeQuery = "";
  product.size_ids.forEach((sizeId) => {
    productSizeQuery += `(${product.id},${sizeId}),`;
  });
  await sqlPool.query(
    `INSERT INTO product_size (product_id,size_id) VALUES ${productSizeQuery.slice(
      0,
      -1
    )}`
  );
  //@ts-ignore
  return rows[0];
}

export async function getAllProductsQuery() {
  // @ts-ignore
  // let [rows] = await sqlPool.query(`SELECT * FROM product`);
  let [rows] = await sqlPool.query(
    `SELECT p.*,pc.color_id,ps.size_id FROM finder.product as p LEFT JOIN finder.product_color as pc ON p.id = pc.product_id LEFT JOIN finder.product_size as ps ON p.id = ps.product_id`
  );

  rows = (rows as [any]).reduce((object, item: any) => {
    if (item.id in object) {
      object[item.id].color_ids.push(item.color_id);
      object[item.id].size_ids.push(item.size_id);
      delete object[item.id].color_id;
      delete object[item.id].size_id;
    } else {
      object[item.id] = item;
      object[item.id].color_ids = [item.color_id];
      object[item.id].size_ids = [item.size_id];
    }
    return object;
  }, {});

  //@ts-ignore
  return Object.values(rows);
}
export async function getAllProductsByCategoryQuery(
  category: string,
  filters: any
) {
  let whereQuery = `WHERE p.category = '${category}'`;
  if (filters.brand_ids?.length) {
    whereQuery += ` AND brand_id IN (${filters.brand_ids})`;
  }

  let colorQuery = "";
  if (filters.color_ids?.length) {
    colorQuery = `JOIN product_color pc ON p.id = pc.product_id`;
    whereQuery += ` AND pc.color_id IN (${filters.color_ids})`;
  }

  let sizeQuery = "";
  if (filters.size_ids?.length) {
    sizeQuery = `JOIN product_size ps ON p.id = ps.product_id`;
    whereQuery += ` AND ps.size_id IN (${filters.size_ids})`;
  }

  // @ts-ignore
  const [rows] = await sqlPool.query(
    `SELECT DISTINCT p.* FROM product p ${colorQuery} ${sizeQuery} ${whereQuery}`,
    []
  );

  return rows;
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
export async function deleteProductQuery(id: number) {
  // @ts-ignore
  const [rows] = await sqlPool.query(`DELETE FROM product WHERE id = ?`, [id]);
}

export async function getSearchResultsQuery(
  search: string,
  minPrice?: number,
  maxPrice?: number
) {
  let query = `SELECT * FROM product WHERE (name LIKE ? OR description LIKE ?)`;
  const params: any[] = [`%${search}%`, `%${search}%`];

  if (minPrice !== undefined) {
    query += ` AND price >= ?`;
    params.push(minPrice);
  }
  if (maxPrice !== undefined) {
    query += ` AND price <= ?`;
    params.push(maxPrice);
  }

  query += ` LIMIT 1000`;

  const [rows] = await sqlPool.query(query, params);

  const hasProfaneWord = search
    .toLowerCase()
    .split(" ")
    .some((word) => ProfunityBadBoySlappySlapWords.has(word));

  if (hasProfaneWord) {
    throw new Error(
      "\nProfanity Detected You Shall Not Pass Bad Boy Naughty Naughty Little Boy\n"
    );
  }

  const hasBrainrot = search
    .toLowerCase()
    .split(" ")
    .some((word) => StinkyGoofyAhhIrrelevantSkibidiToiletWords.has(word));

  if (hasBrainrot) {
    throw new Error("\nBrainrot Detected You Shall Not Pass\n");
  }

  const searchWords = search
    .toLowerCase()
    .split(" ")
    .filter((word) => !CommonNoMeaningWords.has(word));

  const calculateScore = (product: Product) => {
    const nameWords = product.name.toLowerCase().split(" ");
    const descriptionWords = product.description.toLowerCase().split(" ");

    let score = 0;

    searchWords.forEach((word) => {
      const nameWordCount = nameWords.filter((w) => w === word).length;
      const descriptionWordCount = descriptionWords.filter(
        (w) => w === word
      ).length;
      const nameSubstringCount = nameWords.filter((w) =>
        w.includes(word)
      ).length;
      const descriptionSubstringCount = descriptionWords.filter((w) =>
        w.includes(word)
      ).length;

      score += (nameWordCount + descriptionWordCount) * 2;
      score += nameSubstringCount + descriptionSubstringCount;
    });

    const totalWords = nameWords.length + descriptionWords.length;
    return totalWords > 0 ? score / totalWords : 0;
  };

  //@ts-ignore
  const productsWithScores = rows.map((product: any) => ({
    ...product,
    score: calculateScore(product),
  }));

  const filteredSortedProducts = productsWithScores
    .filter((product: any) => product.score > 0)
    .sort((a: any, b: any) => b.score - a.score);

  return filteredSortedProducts;
}
