import { IProductCreate } from "../interfaces/product.interface";
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { SortBy } from "../models/sortBy.model";
import { sqlPool } from "../mysqlPool";
import {
  CommonNoMeaningWords,
  ProfunityBadBoySlappySlapWords,
  StinkyGoofyAhhIrrelevantSkibidiToiletWords,
} from "../SetOfWeirdWords/weirdStinkyWordsSet";

export async function createNewProductQuery(product: IProductCreate) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
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
  //@ts-ignore
  return rows[0];
}

export async function getAllProductsQuery() {
  // @ts-ignore
  const [rows] = await sqlPool.query(`SELECT * FROM product`);

  //@ts-ignore
  return rows;
}
export async function getAllProductsByCategoryQuery(
  category: string,
  filters: any
) {
  let extraQuery = "";
  if (filters.brand_ids) {
    extraQuery = `AND brand_id IN (${filters.brand_ids})`;
  }
  // @ts-ignore
  const [rows] = await sqlPool.query(
    `SELECT * FROM product WHERE category = ? ${extraQuery}`,
    [category]
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
  maxPrice?: number,
  colorIds?: number[],
  brandIds?: number[],
  sizeIds?: number[],
  sortBy: SortBy = "relevancy"
) {
  let query = `
    SELECT DISTINCT p.* 
    FROM product p
    LEFT JOIN product_color pc ON p.id = pc.product_id
    LEFT JOIN product_size ps ON p.id = ps.product_id
    WHERE (p.name LIKE ? OR p.description LIKE ?)
  `;
  const params: any[] = [`%${search}%`, `%${search}%`];

  if (minPrice !== undefined) {
    query += ` AND p.price >= ?`;
    params.push(minPrice);
  }
  if (maxPrice !== undefined) {
    query += ` AND p.price <= ?`;
    params.push(maxPrice);
  }
  if (colorIds && colorIds.length > 0) {
    query += ` AND pc.color_id IN (${colorIds.map(() => "?").join(", ")})`;
    params.push(...colorIds);
  }
  if (brandIds && brandIds.length > 0) {
    query += ` AND p.brand_id IN (${brandIds.map(() => "?").join(", ")})`;
    params.push(...brandIds);
  }
  if (sizeIds && sizeIds.length > 0) {
    query += ` AND ps.size_id IN (${sizeIds.map(() => "?").join(", ")})`;
    params.push(...sizeIds);
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

    let exact_number_of_occurances = 0;
    let similar_number_of_occurances = 0;
    let weightedScoreForExactMatches = 0;

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

      exact_number_of_occurances += nameWordCount + descriptionWordCount;

      similar_number_of_occurances +=
        nameWordCount +
        descriptionWordCount +
        nameSubstringCount +
        descriptionSubstringCount;

      weightedScoreForExactMatches +=
        ((nameWordCount + descriptionWordCount) * 10 +
          nameSubstringCount +
          descriptionSubstringCount) *
        10000;
    });

    const totalWords = nameWords.length + descriptionWords.length;
    const relevancy_score =
      totalWords > 0
        ? weightedScoreForExactMatches / totalWords + totalWords
        : 0;
    return {
      relevancy_score,
      similar_number_of_occurances,
      exact_number_of_occurances,
    };
  };

  //@ts-ignore
  const productsWithScores = rows.map((product: any) => {
    const {
      relevancy_score,
      exact_number_of_occurances,
      similar_number_of_occurances,
    } = calculateScore(product);
    return {
      ...product,
      relevancy_score,
      number_of_substring_and_string_matches: similar_number_of_occurances,
      exact_number_of_matches: exact_number_of_occurances,
    };
  });

  let filteredSortedProducts = [];

  switch (sortBy) {
    case "relevancy":
      filteredSortedProducts = productsWithScores
        .filter((product: any) => product.relevancy_score > 0)
        .sort((a: any, b: any) => b.relevancy_score - a.relevancy_score);
      break;
    case "substring_matches":
      filteredSortedProducts = productsWithScores
        .filter(
          (product: any) => product.number_of_substring_and_string_matches > 0
        )
        .sort(
          (a: any, b: any) =>
            b.number_of_substring_and_string_matches -
            a.number_of_substring_and_string_matches
        );
      break;
    case "exact_matches":
      filteredSortedProducts = productsWithScores
        .filter((product: any) => product.exact_number_of_matches > 0)
        .sort(
          (a: any, b: any) =>
            b.exact_number_of_matches - a.exact_number_of_matches
        );
      break;
    default:
      throw new Error("Invalid sort type specified.");
  }
  return filteredSortedProducts;
}
