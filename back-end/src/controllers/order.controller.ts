import { Request, Response } from "express";

export const createFavourite = async (req: Request, res: Response) => {
  try {
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
    res.status(200).json(products);
    return;
  } catch (error) {
    console.log(error, "error");
    res.status(500).json("Internal Server Error");
    return;
  }
};
