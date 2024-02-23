import express from "express";
import {
  createCart,
  deleteProductFromCart,
  getCartByUserID,
} from "../controllers/cartController";
import protect from "../middlewares/authMiddleware";

const cartRouter = express.Router();

cartRouter.route("/").post(protect, createCart);

cartRouter.route("/getusercart").get(protect, getCartByUserID);

cartRouter.route("/deleteproduct/:pid").delete(protect, deleteProductFromCart);

export default cartRouter;
