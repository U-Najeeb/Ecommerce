import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Product from "../models/productModel";
import { ObjectId } from "mongoose";

const createProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    interface ProductsBody {
      productName: string;
      description: string;
      price: number;
      stock: number;
      rating : number
      seller: ObjectId;
      productImage: string;
      category: ObjectId;
      images : string[]
    }
    const body: ProductsBody = req.body;
    const product = await Product.create(body);

    res.status(201).json({
      message: "Product Created",
      product,
    });
  }
);

const getAllProducts = catchAsync(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const products = await Product.find();

    if (!products) {
      res.status(404).json({
        messages: "No products found",
      });
    }
    res.status(200).json({
      message: "Products Found",
      products,
    });
  }
);

const getProductByID = catchAsync(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const _id = req.params.id;
    const product = await Product.findOne({ _id });

    if (!product) {
      res.status(404).json({
        messages: "No product found",
      });
    }
    res.status(200).json({
      message: "Product Found",
      product,
    });
  }
);

const updateProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    interface updateProductBody {
        productName?: string;
        description?: string;
        price?: number;
        stock?: number;
        rating ?: number
        seller?: ObjectId;
        productImage?: string;
        category?: ObjectId;
        images ?: string[]
      }
    const _id = req.params.id;
    const body: updateProductBody = req.body;
    const product = await Product.findByIdAndUpdate({ _id }, body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      res.status(400).json({
        messages: "No product updated",
      });
    }
    res.status(200).json({
      message: "Product updated",
      product,
    });
  }
);

const deleteProduct = catchAsync(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const _id = req.params.id;
    await Product.findByIdAndDelete({ _id });

    res.status(204).json({
      message: "Product Deleted",
    });
  }
);

const getProductsBySellerID = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const _id = req.params.id;
      const products = await Product.find({ seller :  _id });

      if (!products){
        res.status(404).json({
            message : "No products found for this seller"
        })
      }
      res.status(200).json({
        message: "Products Found",
        products
      });
    }
  );

export {
  getAllProducts,
  getProductByID,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductsBySellerID
};
