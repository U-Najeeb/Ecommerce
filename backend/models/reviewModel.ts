import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    review: {
      type: String,
    },
    reviewOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
