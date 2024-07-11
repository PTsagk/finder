import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ILoginRequest } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import {
  createNewUser,
  getUserByIdQuery,
  getUserByUsernameAndPassword,
  updateExistingUser,
} from "../queries/user.query";

export const productNewCreation = async (req: Request, res: Response) => {
  try {
    const { name, price, image, description, category_id, brand_id } = req.body;

    const categoryId = parseInt(category_id);
    const brandId = parseInt(brand_id);
    if (!categoryId || !brandId) {
      res.status(400).json("Invalid Category or Brand ID");
      return;
    }
    await createNewProduct(
      name,
      price,
      image,
      description,
      categoryId,
      brandId
    );
    res.status(200).json("Product Created Successfully\nOK!");
    return;
  } catch (error) {
    res.json("Internal Server Error").status(500);
    return;
  }
};
export const productUpdate = async (req: Request, res: Response) => {
  try {
    const { name, price, image, description, category_id, brand_id } = req.body;

    const categoryId = parseInt(category_id);
    const brandId = parseInt(brand_id);
    if (!categoryId || !brandId) {
      res.status(400).json("Invalid Category or Brand ID");
      return;
    }
    await createNewProduct(
      name,
      price,
      image,
      description,
      categoryId,
      brandId
    );
    res.status(200).json("Product Created Successfully\nOK!");
    return;
  } catch (error) {
    res.json("Internal Server Error").status(500);
    return;
  }
};

export async function createNewProduct(
  name: string,
  price: string,
  image: string,
  description: string,
  category_id: number,
  brand_id: number
) {
  // @ts-ignore

  const [rows] = await sqlPool.query(
    `CREATE PRODUCT (name, price, image, description, category_id, brand_id) VALUES (?, ?, ?, ?, ?, ?) `,

    [name, price, image, description, category_id, brand_id]
  );
  //@ts-ignore
  return rows[0];
}
