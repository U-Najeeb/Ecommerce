import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  orderOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productOrdered: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantityOfOrders: {
    type: Number,
    required: true,
    min: 1
  },
  orderStatus: {
    type: String,
    enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded", "On Hold"],
    default: "Order Placed"
  },
  shippingAddress: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  trackingNumber: {
    type: String
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
