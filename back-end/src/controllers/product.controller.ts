import { Request, Response } from "express";
import {
  createNewProductQuery,
  getAllProductsByCategoryQuery,
  getAllProductsQuery,
  getProductByIdQuery,
  getTop_Nth_BestSellersByBrandQuery,
  getTop_Nth_BestSellersByCategoryQuery,
  getTop_Nth_BestSellersQuery,
  getTop_Nth_FeaturedProductsQuery,
  updateProductQuery,
} from "../queries/product.query";

export const productNewCreation = async (req: Request, res: Response) => {
  try {
    const { category_id, brand_id } = req.body;

    const categoryId = parseInt(category_id);
    const brandId = parseInt(brand_id);
    if (!categoryId || !brandId) {
      res.status(400).json("Invalid Category or Brand ID");
      return;
    }
    await createNewProductQuery(req.body);
    res.status(200).json("Product Created Successfully\nOK!");
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};
export const productUpdate = async (req: Request, res: Response) => {
  try {
    const { category_id, brand_id } = req.body;

    const categoryId = parseInt(category_id);
    const brandId = parseInt(brand_id);
    if (!categoryId || !brandId) {
      res.status(400).json("Invalid Category or Brand ID");
      return;
    }
    await updateProductQuery(req.body);

    res.status(200).json("Product Created Successfully\nOK!");
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsQuery();
    res.status(200).json(products);
  } catch (error) {
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

    const products = await getAllProductsByCategoryQuery(category);
    res.json(products).status(200);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);

    const product = await getProductByIdQuery(parsedId);
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
