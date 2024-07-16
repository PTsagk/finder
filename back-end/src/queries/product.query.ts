import {
  IProductCreate,
  IProductResult,
} from "../interfaces/product.interface";
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
      if (!object[item.id].color_ids.includes(item.color_id)) {
        object[item.id].color_ids.push(item.color_id);
        delete object[item.id].color_id;
      }
      if (!object[item.id].size_ids.includes(item.size_id)) {
        object[item.id].size_ids.push(item.size_id);
        delete object[item.id].size_id;
      }
    } else {
      object[item.id] = item;
      object[item.id].size_ids = [item.size_id];
      object[item.id].color_ids = [item.color_id];
      delete object[item.id].size_id;
      delete object[item.id].color_id;
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

  if (filters.color_ids?.length) {
    whereQuery += ` AND pc.color_id IN (${filters.color_ids})`;
  }

  if (filters.size_ids?.length) {
    whereQuery += ` AND ps.size_id IN (${filters.size_ids})`;
  }

  // @ts-ignore
  let [rows] = await sqlPool.query(
    `SELECT DISTINCT p.*,pc.color_id,ps.size_id,
        CASE WHEN f.product_id IS NULL THEN FALSE ELSE TRUE END AS favourite
 FROM finder.product p
 LEFT JOIN favorite_product f ON p.id = f.product_id LEFT JOIN finder.product_color as pc ON p.id = pc.product_id LEFT JOIN finder.product_size as ps ON p.id = ps.product_id ${whereQuery}`,
    []
  );

  rows = (rows as [any]).reduce((object, item: any) => {
    if (item.id in object) {
      if (!object[item.id].color_ids.includes(item.color_id)) {
        object[item.id].color_ids.push(item.color_id);
        delete object[item.id].color_id;
      }
      if (!object[item.id].size_ids.includes(item.size_id)) {
        object[item.id].size_ids.push(item.size_id);
        delete object[item.id].size_id;
      }
    } else {
      object[item.id] = item;
      object[item.id].size_ids = [item.size_id];
      object[item.id].color_ids = [item.color_id];
      delete object[item.id].size_id;
      delete object[item.id].color_id;
    }
    return object;
  }, {});

  //@ts-ignore
  return Object.values(rows);
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
  userId: number,
  search: string = "",
  category: Category,
  minPrice?: number,
  maxPrice?: number,
  colorIds?: number[],
  brandIds?: number[],
  sizeIds?: number[],
  sortBy: SortBy = "relevancy"
) {
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

  let query = `
    SELECT DISTINCT p.* 
    FROM product p
    LEFT JOIN product_color pc ON p.id = pc.product_id
    LEFT JOIN product_size ps ON p.id = ps.product_id
    WHERE ( p.category = ? AND
  `;

  const likeClauses = searchWords.map(
    (word) => `(p.name LIKE ? OR p.description LIKE ?)`
  );
  query += likeClauses.join(" OR ");
  query += `)`;

  const params: any[] = [category];
  searchWords.forEach((word) => {
    params.push(`%${word}%`, `%${word}%`);
  });

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

  query += ` LIMIT 5000`;

  const [rows] = await sqlPool.query(query, params);
  //@ts-ignore
  const productIds = rows.map((row: any) => row.id);

  if (productIds.length === 0) {
    return [];
  }

  const placeholders = productIds.map(() => "?").join(", ");
  const reviewsQuery = `
    SELECT * 
    FROM review 
    WHERE product_id IN (${placeholders})
    ORDER BY product_id
  `;
  const [reviews] = await sqlPool.query(reviewsQuery, productIds);

  const [reviewStats] = await sqlPool.query(
    `SELECT product_id, COUNT(*) AS total_reviews, COUNT(score) AS number_of_rated_reviews, AVG(score) AS reviews_average_rating 
    FROM review 
    WHERE product_id IN (${placeholders})
    GROUP BY product_id`,
    productIds
  );

  const [salesStats] = await sqlPool.query(
    `SELECT product_id, COUNT(*) AS number_of_sales 
    FROM finder.order 
    WHERE product_id IN (${placeholders})
    GROUP BY product_id`,
    productIds
  );

  const [productColors] = await sqlPool.query(
    `SELECT distinct product_id, color_id 
    FROM product_color 
    WHERE product_id IN (${placeholders})`,
    productIds
  );

  const [productSizes] = await sqlPool.query(
    `SELECT distinct product_id, size_id 
    FROM product_size 
    WHERE product_id IN (${placeholders})`,
    productIds
  );

  const [favoriteProducts] = await sqlPool.query(
    `SELECT distinct product_id 
    FROM favorite_product 
    WHERE user_id = ?`,
    [userId]
  );

  // Create a map for review stats
  //@ts-ignore
  const reviewStatsMap = reviewStats.reduce((acc: any, stat: any) => {
    acc[stat.product_id] = stat;
    return acc;
  }, {});

  //@ts-ignore
  const salesStatsMap = salesStats.reduce((acc: any, stat: any) => {
    acc[stat.product_id] = stat.number_of_sales;
    return acc;
  }, {});

  //@ts-ignore
  const reviewsByProduct: { [key: number]: string[] } = reviews.reduce(
    (acc: any, review: any) => {
      acc[review.product_id] = acc[review.product_id] || [];
      acc[review.product_id].push(review.description);
      return acc;
    },
    {}
  );

  //@ts-ignore
  const colorsByProduct: { [key: number]: number[] } = productColors.reduce(
    (acc: any, color: any) => {
      acc[color.product_id] = acc[color.product_id] || [];
      acc[color.product_id].push(color.color_id);
      return acc;
    },
    {}
  );

  //@ts-ignore
  const sizesByProduct: { [key: number]: number[] } = productSizes.reduce(
    (acc: any, size: any) => {
      acc[size.product_id] = acc[size.product_id] || [];
      acc[size.product_id].push(size.size_id);
      return acc;
    },
    {}
  );

  const favoriteProductIds = new Set(
    //@ts-ignore
    favoriteProducts.map((fp: any) => fp.product_id)
  );

  const calculateScore = (product: Product) => {
    const nameWords = product.name.toLowerCase().split(" ");
    const descriptionWords = product.description.toLowerCase().split(" ");
    const reviewTexts = reviewsByProduct[product.id] || [];
    const reviewWords = reviewTexts.flatMap((text) =>
      text.toLowerCase().split(" ")
    );

    let exact_number_of_occurances = 0;
    let similar_number_of_occurances = 0;
    let exact_and_similar_number_of_occurances = 0;
    let weightedScoreForExactMatches = 0;

    searchWords.forEach((word) => {
      const nameWordCount = nameWords.filter((w) => w === word).length;
      const descriptionWordCount = descriptionWords.filter(
        (w) => w === word
      ).length;
      const reviewWordCount = reviewWords.filter((w) => w === word).length;

      const nameSubstringCount = nameWords.filter((w) =>
        w.includes(word)
      ).length;
      const descriptionSubstringCount = descriptionWords.filter((w) =>
        w.includes(word)
      ).length;
      const reviewSubstringCount = reviewWords.filter((w) =>
        w.includes(word)
      ).length;

      exact_number_of_occurances +=
        nameWordCount + descriptionWordCount + reviewWordCount;

      similar_number_of_occurances +=
        nameSubstringCount + descriptionSubstringCount + reviewSubstringCount;

      exact_and_similar_number_of_occurances +=
        nameWordCount + descriptionWordCount + reviewWordCount;
      nameSubstringCount + descriptionSubstringCount + reviewSubstringCount;

      weightedScoreForExactMatches +=
        ((nameWordCount + descriptionWordCount + reviewWordCount) * 10 +
          nameSubstringCount +
          descriptionSubstringCount +
          reviewSubstringCount) *
        10000;
    });

    const totalWords =
      nameWords.length + descriptionWords.length + reviewWords.length;
    const relevancy_score =
      totalWords > 0
        ? weightedScoreForExactMatches / totalWords + totalWords
        : 0;
    return {
      relevancy_score,
      similar_number_of_occurances,
      exact_number_of_occurances,
      exact_and_similar_number_of_occurances,
    };
  };

  //@ts-ignore
  const productsWithScores: IProductResult[] = rows.map((product: any) => {
    const {
      relevancy_score,
      exact_number_of_occurances,
      similar_number_of_occurances,
      exact_and_similar_number_of_occurances,
    } = calculateScore(product);
    const reviewStats = reviewStatsMap[product.id] || {
      total_reviews: 0,
      number_of_rated_reviews: 0,
      reviews_average_rating: 0,
    };
    const number_of_sales = salesStatsMap[product.id] || 0;
    const colors = colorsByProduct[product.id] || [];
    const sizes = sizesByProduct[product.id] || [];
    const is_favorite = favoriteProductIds.has(product.id);
    return {
      ...product,
      relevancy_score,
      number_of_substring_and_string_matches:
        exact_and_similar_number_of_occurances,
      number_of_substring_matches: similar_number_of_occurances,
      exact_number_of_matches: exact_number_of_occurances,
      ...reviewStats,
      number_of_sales,
      colors,
      sizes,
      is_favorite,
    };
  });

  let sortedProducts: any[] = [];

  switch (sortBy) {
    case "relevancy":
      sortedProducts = productsWithScores.sort(
        (a: any, b: any) => b.relevancy_score - a.relevancy_score
      );
      break;
    case "substring_matches":
      sortedProducts = productsWithScores.sort(
        (a: any, b: any) =>
          b.exact_number_of_occurances -
          a.number_of_substring_and_string_matches
      );
      break;
    case "exact_matches":
      sortedProducts = productsWithScores.sort(
        (a: any, b: any) =>
          b.number_of_substring_matches - a.number_of_substring_matches
      );
      break;
    case "reviews_score":
      sortedProducts = productsWithScores.sort(
        (a: any, b: any) => b.reviews_average_rating - a.reviews_average_rating
      );
      break;
    case "reviews_count":
      sortedProducts = productsWithScores.sort(
        (a: any, b: any) => b.total_reviews - a.total_reviews
      );
      break;
    case "rated_reviews_count":
      sortedProducts = productsWithScores.sort(
        (a: any, b: any) =>
          b.number_of_rated_reviews - a.number_of_rated_reviews
      );
      break;
    case "date_added":
      sortedProducts = productsWithScores.sort(
        (a: any, b: any) => b.created_at - a.created_at
      );
      break;
    case "number_of_sales":
      sortedProducts = productsWithScores.sort(
        (a: any, b: any) => b.number_of_sales - a.number_of_sales
      );
      break;
    case "featured":
      sortedProducts = productsWithScores.sort(
        (a: any, b: any) => b.featured - a.featured
      );
      break;
    case "favorite_first":
      sortedProducts = productsWithScores.sort(
        (a: any, b: any) => b.is_favorite - a.is_favorite
      );
      break;
    default:
      throw new Error("Invalid sort type specified.");
  }

  return sortedProducts;
}
