import { Request, Response } from "express";
import { Category } from "../models/category.model";
import {
  createNewCategoryQuery,
  deleteCategoryQuery,
  getCategoriesQuery,
  updateNewCategoryQuery,
} from "../queries/category.query";

export const createCategory = async (
  req: Request<null, null, Category>,
  res: Response
) => {
  try {
    const category = await createNewCategoryQuery(req.body);
    if (!category) {
      throw new Error("Something went wrong");
    }
    res.json("Ok").status(200);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const updateCategory = async (
  req: Request<null, null, Category>,
  res: Response
) => {
  try {
    const category = await updateNewCategoryQuery(req.body);
    if (!category) {
      throw new Error("Something went wrong");
    }
    res.json("Ok").status(200);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const deleteCategory = async (
  req: Request<null, null, Category>,
  res: Response
) => {
  try {
    const category = await deleteCategoryQuery(req.body);
    if (!category) {
      throw new Error("Something went wrong");
    }
    res.json("Ok").status(200);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const getCategories = async (
  req: Request<null, null, Category>,
  res: Response
) => {
  try {
    const categories = await getCategoriesQuery();
    if (!categories) {
      throw new Error("Something went wrong");
    }
    res.json("Ok").status(200);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};
