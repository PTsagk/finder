import { Request, Response } from "express";
import {
  createNewSizeQuery,
  deleteSizeByIdQuery,
  getSizesQuery,
  updateSizeQuery,
} from "../queries/size.query";

export const createSize = async (req: Request, res: Response) => {
  try {
    const newSize = await createNewSizeQuery(req.body);
    res.status(200).json(newSize);
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const updateSize = async (req: Request, res: Response) => {
  try {
    await updateSizeQuery(req.body);
    res.status(200).json("Size Updated!");
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const getSizes = async (req: Request, res: Response) => {
  try {
    const sizes = await getSizesQuery();
    res.status(200).json(sizes);
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const deleteSize = async (req: Request, res: Response) => {
  try {
    await deleteSizeByIdQuery(req.body);
    res.status(200).json("Size Deleted!");
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};
