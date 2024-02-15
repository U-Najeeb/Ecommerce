import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByID,
  getProductsByCategory,
  getProductsBySellerID,
  updateProduct,
} from "../controllers/productsController";

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts).post(createProduct);

productRouter.route("/sellerproducts/:id").get(getProductsBySellerID);

productRouter.route("/productsbycategory/:category").get(getProductsByCategory)

productRouter
  .route("/:id")
  .get(getProductByID)
  .patch(updateProduct)
  .delete(deleteProduct);
export default productRouter;
