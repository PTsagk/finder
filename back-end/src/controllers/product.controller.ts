import { Request, Response } from "express";
import { createNewProductQuery } from "../queries/product.query";

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
    res.json("Internal Server Error").status(500);
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
    await createNewProductQuery(req.body);

    res.status(200).json("Product Created Successfully\nOK!");
    return;
  } catch (error) {
    res.json("Internal Server Error").status(500);
    return;
  }
};
