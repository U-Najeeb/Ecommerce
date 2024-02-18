import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Cart from "../models/cartModel";
import { ObjectId } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { log } from "console";

interface customRequest extends Request {
  user: JwtPayload;
}

const createCart = catchAsync(
  async (req: customRequest, res: Response, _next: NextFunction) => {
    interface cartBody {
      itemsInCart: Number;
      productsInCart: {
        productId: ObjectId;
      };
      quantityOfProduct: Number;
    }
    const body: cartBody = req.body;
    const consumer = req.user._id;

    const cart_already_present = await Cart.findOne({ consumer });

    if (cart_already_present) {
      const productIndex = cart_already_present.productsInCart.findIndex(
        (product) => product.productId == req.body.productsInCart.productId
      );
      
      if (productIndex !== -1) {
        cart_already_present.productsInCart[
          productIndex
        ].quantityOfProduct += 1;

        await cart_already_present.save();
        return res.status(200).json({
          message: "Product added to cart again",
        });
      } else {
        cart_already_present.productsInCart.push({
          productId: req.body.productsInCart.productId,
        });
        cart_already_present.itemsInCart += 1
        await cart_already_present.save();
        return res.status(200).json({
          message: "Product added to cart",
        });
      }
    }
    const cart = await Cart.create({
      consumer,
      ...body,
    });

    res.status(201).json({
      message: "Product added to cart",
      cart,
    });
  }
);

const getCartByUserID = catchAsync(
  async (req: customRequest, res: Response, _next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        message: "Log in first",
      });
    }
    const cart = await Cart.findOne({ consumer: user?._id });
    res.status(200).json({
      message: "Cart Found",
      cart,
    });
  }
);
export { createCart, getCartByUserID };
