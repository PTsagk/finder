import express from "express";
import { authenticateController } from "../controllers/auth.controller";
import {
  userAuth,
  userLogin,
  userLogout,
  userRegister,
  userUpdate,
} from "../controllers/user.controller";

const router = express.Router();

router.route("/login").post(userLogin);
router.route("/auth").get(userAuth);
router.route("/register").post(userRegister);
router.route("/logout").post(userLogout);
router.route("/update").put(authenticateController, userUpdate);

export default router;
