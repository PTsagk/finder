import { Request, Response } from "express";
import {
  createNewColorQuery,
  deleteColorByIdQuery,
  getColorsQuery,
  updateColorQuery,
} from "../queries/color.query";

export const createColor = async (req: Request, res: Response) => {
  try {
    const newColor = await createNewColorQuery(req.body);
    res.status(200).json(newColor);
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const updateColor = async (req: Request, res: Response) => {
  try {
    await updateColorQuery(req.body);
    res.status(200).json("Color Updated!");
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const getColors = async (req: Request, res: Response) => {
  try {
    const colors = await getColorsQuery();
    res.status(200).json(colors);
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};

export const deleteColor = async (req: Request, res: Response) => {
  try {
    await deleteColorByIdQuery(req.body);
    res.status(200).json("Color Deleted!");
    return;
  } catch (error) {
    res.status(500).json("Internal Server Error");
    return;
  }
};
