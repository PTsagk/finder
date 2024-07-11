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

export const userLogin = async (req: Request<ILoginRequest>, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) {
      throw new Error("Incorrect credentials");
    }
    const { id } = user;
    const token = jwt.sign({ id }, "secret", { expiresIn: "1d" });
    res.cookie("auth", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    res.json({ ...user }).status(200);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export const productNewCreation = async (req: Request, res: Response) => {
  try {
    const { name, price, image, description, category_id, brand_id } = req.body;

    const categoryId = parseInt(category_id);
    const brandId = parseInt(brand_id);
    if (categoryId && brandId) {
      const newProduct = await createNewProduct(
        name,
        price,
        image,
        description,
        category_id,
        brand_id
      );
      res.status(200).json("Product Created Successfully\nOK!");
    }
  } catch (error) {
    res.json("Internal Server Error").status(500);
  }
};

export const userAuth = async (req: Request, res: Response) => {
  try {
    // const { token } = req.body;
    // console.log(token);
    if ("auth" in req.cookies) {
      const { auth } = req.cookies;
      jwt.verify(auth as string, "secret", async (err, decoded) => {
        if (err) {
          console.error(err);
        }
        //@ts-ignore
        const { id } = decoded;
        const user = await getUserByIdQuery(id);
        if (user) {
          res.json({ ...user }).status(200);
        } else {
          throw new Error("User not found");
        }
      });
    } else {
      res.status(404).json("No auth");
    }
    // console.log(id);
    // const user = await getUserByUsernameAndPassword(username, password);
    // const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });
    // res.cookie("token", token, { httpOnly: true });
  } catch (error) {
    res.json("Internal Server Error").status(500);
  }
};

export const userRegister = async (req: Request, res: Response) => {
  try {
    const newUser = await createNewUser(req.body);
    res.json("OK").status(200);
  } catch (error) {
    res.json("Internal Server Error").status(500);
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
