import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Cart from "../models/cartModel";
import { ObjectId } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { log } from "console";
import AppError from "../utils/AppError";

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
        cart_already_present.itemsInCart += 1;
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

const deleteProductFromCart = catchAsync(
  async (req: customRequest, res: Response, _next: NextFunction) => {
    const consumer = req.user._id;
    const { pid } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { consumer, "productsInCart.productId": pid },
      {
        $pull: { productsInCart: { productId: pid } },
        $inc: { itemsInCart: -1 },
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    return res
      .status(200)
      .json({ message: "Product deleted from cart successfully", cart });
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
    let cart = await Cart.findOne({ consumer: user?._id }).populate(
      "productsInCart.productId"
    );

    res.status(200).json({
      message: "Cart Found",
      cart,
    });
  }
);

const updateProduct = catchAsync(
  async (req: customRequest, res: Response, next: NextFunction) => {
    const consumer = req.user._id;
    const { pid } = req.params;
    const { operation } = req.body;

    if (operation === "increment") {
      const cart = await Cart.findOneAndUpdate(
        { consumer, "productsInCart.productId": pid },
        {
          $inc: { "productsInCart.$.quantityOfProduct": 1 },
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Product deleted from cart successfully", cart });
    } else if (operation === "decrement") {
      const cart = await Cart.findOne({
        consumer,
        "productsInCart.productId": pid,
      });

      if (!cart) {
        return res.status(404).json({
          message: "Product not found in cart or quantity is already zero",
        });
      }

      const productIndex = cart.productsInCart.findIndex(
        (product) => String(product.productId) === pid
      );

      if (
        productIndex === -1 ||
        cart.productsInCart[productIndex].quantityOfProduct === 0
      ) {
        // cart.productsInCart.splice(productIndex, productIndex);
        // await cart.save();
        return next(
          new AppError(
            "Product not found in cart or quantity is already zero",
            404
          )
        );
      }

      cart.productsInCart[productIndex].quantityOfProduct--;

      const updatedCart = await cart.save();
      if (!updatedCart) {
        return next(new AppError("Failed to update cart", 400));
      }
      return res.status(200).json({
        message: "Product quantity decremented successfully",
        cart: updatedCart,
      });
    }
  }
);
export { createCart, getCartByUserID, deleteProductFromCart, updateProduct };
