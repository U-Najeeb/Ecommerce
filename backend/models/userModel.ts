import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

enum UserRole {
  Consumer = "consumer",
  Seller = "seller",
}

interface UserDocument extends Document {
  fName: string;
  lName: string;
  email: string;
  address: string;
  role: UserRole;
  products: mongoose.Types.ObjectId[];
  password: string;
  checkCorrectPassword(
    passwordFromBody: string,
    passwordFromDB: string
  ): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
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
    enum: UserRole,
    default: UserRole.Consumer,
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
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.checkCorrectPassword = async function (
  passwordFromBody: string,
  passwordFromDB: string
): Promise<boolean> {
  return bcrypt.compare(passwordFromBody, passwordFromDB);
};
const User = mongoose.model("User", userSchema);

export default User;
