import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productsInCart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantityOfProduct: {
          type: Number,
          default: 1,
          required: true,
        },
      },
    ],
    itemsInCart: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

cartSchema.index({ consumer: 1 });

cartSchema.index({ "productsInCart.productId": 1 });
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
