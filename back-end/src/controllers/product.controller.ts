import { Request, Response } from "express";
import { Category } from "../models/category.model";
import { SortBy } from "../models/sortBy.model";
import {
  createNewProductQuery,
  deleteProductQuery,
  getAllProductsByCategoryQuery,
  getAllProductsQuery,
  getProductByIdQuery,
  getSearchResultsQuery,
  getTop_Nth_BestSellersByBrandQuery,
  getTop_Nth_BestSellersByCategoryQuery,
  getTop_Nth_BestSellersQuery,
  getTop_Nth_FeaturedProductsQuery,
  updateProductQuery,
} from "../queries/product.query";

export const productNewCreation = async (req: Request, res: Response) => {
  try {
    await createNewProductQuery(req.body);
    res.status(200).json("Product Created Successfully\nOK!");
    return;
  } catch (error) {
    console.log(error, "error");
    res.status(500).json("Internal Server Error");
    return;
  }
};
export const productUpdate = async (req: Request, res: Response) => {
  try {
    await updateProductQuery(req.body);
    res.status(200).json("Product Updated Successfully\nOK!");
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsQuery();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const getAllProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    if (category !== "womens" && category !== "mens" && category !== "kids") {
      res.status(400).json("Invalid Category");
      return;
    }

    const products = await getAllProductsByCategoryQuery(category, req.body);
    res.json(products).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);
    const userId = res.locals.id;

    const product = await getProductByIdQuery(userId, parsedId);
    res.json(product).status(200);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const getTop_Nth_BestSellers = async (req: Request, res: Response) => {
  try {
    const { bestsellers } = req.params;
    const parsedBestsellers = bestsellers ? parseInt(bestsellers) : 3;
    const products = await getTop_Nth_BestSellersQuery(parsedBestsellers);
    res.json(products).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const getTop_Nth_BestSellersByCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { bestsellers } = req.params;
    const parsedBestsellers = bestsellers ? parseInt(bestsellers) : 3;
    const { category } = req.params;
    if (category !== "womens" && category !== "mens" && category !== "kids") {
      res.status(400).json("Invalid Category");
      return;
    }
    const products = await getTop_Nth_BestSellersByCategoryQuery(
      category,
      parsedBestsellers
    );

    res.json(products).status(200);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const getTop_Nth_BestSellersByBrand = async (
  req: Request,
  res: Response
) => {
  try {
    const { bestsellers } = req.params;
    const parsedBestsellers = bestsellers ? parseInt(bestsellers) : 3;
    const { brand_id } = req.params;
    const parsedBrandId = parseInt(brand_id);
    if (!parsedBrandId) {
      res.status(400).json("Invalid Brand ID");
      return;
    }
    const products = await getTop_Nth_BestSellersByBrandQuery(
      parsedBrandId,
      parsedBestsellers
    );
    res.json(products).status(200);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const getTop_Nth_FeaturedProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const { featuredNumber } = req.params;
    const parsedfeaturedNumber = featuredNumber ? parseInt(featuredNumber) : 3;

    const products = await getTop_Nth_FeaturedProductsQuery(
      parsedfeaturedNumber
    );
    res.json(products).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const parsedId = parseInt(id);
    await deleteProductQuery(parsedId);
    res.status(200).json("Product Deleted Successfully\nOK!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  const validSortByValues = new Set([
    "relevancy",
    "substring_matches",
    "exact_matches",
    "reviews_score",
    "reviews_count",
    "rated_reviews_count",
    "date_added",
    "number_of_sales",
    "featured",
    "favorite_first",
  ]);

  const validCategoryValues = new Set(["womens", "mens", "kids"]);

  try {
    let {
      search,
      category,
      minPrice,
      maxPrice,
      color_ids = [],
      brand_ids = [],
      size_ids = [],
      sortBy = "relevancy",
    } = req.body;

    const userId = res.locals.id;

    if (!category) {
      res.status(400).json("Category is required");
      return;
    }
    if (!validCategoryValues.has(category)) {
      throw new Error("Invalid category specified.");
    }

    if (minPrice !== undefined && typeof minPrice !== "number") {
      res.status(400).json("Invalid minPrice");
      return;
    }
    if (maxPrice !== undefined && typeof maxPrice !== "number") {
      res.status(400).json("Invalid maxPrice");
      return;
    }
    if (!Array.isArray(color_ids)) {
      res.status(400).json("Invalid color_ids");
      return;
    }
    if (!Array.isArray(brand_ids)) {
      res.status(400).json("Invalid brand_ids");
      return;
    }
    if (!Array.isArray(size_ids)) {
      res.status(400).json("Invalid size_ids");
      return;
    }
    if (sortBy && !validSortByValues.has(sortBy)) {
      throw new Error("Invalid sort type specified.");
    }

    const results = await getSearchResultsQuery(
      userId,
      search,
      category as Category,
      minPrice,
      maxPrice,
      color_ids,
      brand_ids,
      size_ids,
      sortBy as SortBy
    );

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};
