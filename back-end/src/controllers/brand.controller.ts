import { Request, Response } from "express";
import {
  createNewBrandQuery,
  deleteBrandByIdQuery,
  getBrandsQuery,
  updateBrandQuery,
} from "../queries/brand.query";

export const createBrand = async (req: Request, res: Response) => {
  try {
    await createNewBrandQuery(req.body);
    res.status(200).json("Product Created Successfully\nOK!");
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    await updateBrandQuery(req.body);
    res.status(200).json("Product Created Successfully\nOK!");
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await getBrandsQuery();
    res.status(200).json(brands);
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    await deleteBrandByIdQuery(req.body);
    res.status(200).json("Product Created Successfully\nOK!");
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};
