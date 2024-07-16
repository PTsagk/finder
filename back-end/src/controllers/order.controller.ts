import { Request, Response } from "express";
import { createOrderQuery } from "../queries/order.query";

export const createOrder = async (req: Request, res: Response) => {
  try {
    createOrderQuery(req.body.products, req.body.userId);
    res.status(200).json("Order created\nOK!");
    return;
  } catch (error) {
    console.log(error, "error");
    res.status(500).json("Internal Server Error");
    return;
  }
};
