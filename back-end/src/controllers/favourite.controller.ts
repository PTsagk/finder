import { Request, Response } from "express";
import {
  createFavouriteQuery,
  deleteFavouriteQuery,
  getFavouritesByUserQuery,
} from "../queries/favourite.query";

export const createFavourite = async (req: Request, res: Response) => {
  try {
    await createFavouriteQuery(req.body);
    res.status(200).json("Favourited Successfully\nOK!");
    return;
  } catch (error) {
    console.log(error, "error");
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const deleteFavourite = async (req: Request, res: Response) => {
  try {
    await deleteFavouriteQuery(req.body as any);
    res.status(200).json("Unfavourited Successfully\nOK!");
    return;
  } catch (error) {
    console.log(error, "error");
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const getFavourites = async (req: Request, res: Response) => {
  try {
    const products = await getFavouritesByUserQuery(req.params.user_id as any);
    res.status(200).json(products);
    return;
  } catch (error) {
    console.log(error, "error");
    res.status(500).json("Internal Server Error");
    return;
  }
};
