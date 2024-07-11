import express from "express";
import { authenticateController } from "../controllers/auth.controller";
import {
  userAuth,
  userLogin,
  userRegister,
  userUpdate,
} from "../controllers/user.controller";

const router = express.Router();

router.route("/create").post(userLogin);
router.route("/auth").get(userAuth);
router.route("/register").post(userRegister);
router.route("/update_user").put(authenticateController, userUpdate);

export default router;
