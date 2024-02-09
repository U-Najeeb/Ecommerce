import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  fName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: 50,
  },
  lName: {
    type: String,
    required: [true, "Last name is required"],
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: (value: string) => /\S+@\S+\.\S+/.test(value),
      message: "Invalid email address",
    },
  },
  address: {
    type: String,
    required: [true, "Please provide your address"],
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
    required: [true, "Password is required"],
    min: 6,
    select : false
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
