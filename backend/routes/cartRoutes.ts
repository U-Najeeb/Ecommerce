import express from "express";
import {
  createCart,
  deleteProductFromCart,
  getCartByUserID,
  updateProduct,
} from "../controllers/cartController";
import protect from "../middlewares/authMiddleware";

const cartRouter = express.Router();

cartRouter.route("/").post(protect, createCart);

cartRouter.route("/getusercart").get(protect, getCartByUserID);

cartRouter.route("/updateproduct/:pid").patch(protect, updateProduct);

cartRouter.route("/deleteproduct/:pid").delete(protect, deleteProductFromCart);

export default cartRouter;
