import express from "express"
import { createCart, getCartByUserID } from "../controllers/cartController"
import protect from "../middlewares/authMiddleware"

const cartRouter = express.Router()

cartRouter.route("/").post(protect,createCart)

cartRouter.route("/getusercart").get(protect, getCartByUserID)

export default cartRouter