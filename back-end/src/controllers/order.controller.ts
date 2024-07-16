import { Request, Response } from "express";
import { createOrderQuery, getOrdersQuery } from "../queries/order.query";

export const createOrder = async (req: Request, res: Response) => {
  try {
    await createOrderQuery(req.body.products, req.body.userId);
    res.status(200).json("Order created\nOK!");
    return;
  } catch (error) {
    console.log(error, "error");
    res.status(500).json("Internal Server Error");
    return;
  }
};
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getOrdersQuery(req.params.userId);
    res.status(200).json(orders);
    return;
  } catch (error) {
    console.log(error, "error");
    res.status(500).json("Internal Server Error");
    return;
  }
};
