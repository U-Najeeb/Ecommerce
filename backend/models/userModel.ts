import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  fName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => /\S+@\S+\.\S+/.test(value),
      message: "Invalid email address",
    },
  },
  address: {
    type: String,
    required: true,
    minlength: 10,
  },
  role: {
    type: String,
    enum: ["consumer", "seller"],
    default: "consumer",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
