import express from "express";
import { login, signUp, validateToken } from "../controllers/authController";

const authRouter = express.Router();

authRouter.route("/login").post(login);

authRouter.route("/signup").post(signUp);

authRouter.route("/validate-token").post(validateToken)

export default authRouter;
