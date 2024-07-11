import express from "express";
import {
  userAuth,
  userLogin,
  userRegister,
} from "../controllers/user.controller";

const router = express.Router();

router.route("/login").post(userLogin);
router.route("/auth").get(userAuth);
router.route("/register").post(userRegister);

export default router;
