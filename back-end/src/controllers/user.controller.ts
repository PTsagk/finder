import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ILoginRequest } from "../interfaces/user.interface";
import { getUserByUsernameAndPassword } from "../queries/user.query";

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
