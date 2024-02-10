import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import AppError from "../utils/AppError";
import { ObjectId } from "mongoose";

const signingFunc = (payload: string | object): string | undefined => {
  if (!process.env.JWT_SECRET) {
    return undefined;
  }

  const tokenPayload = typeof payload === 'string' ? payload : payload.toString();

  return jwt.sign(tokenPayload, process.env.JWT_SECRET);
};

//@Route            api/v1/auth/login
//@Description      Logging The User In
const signUp = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    interface Body {
      fName: string;
      lName: string;
      email: string;
      password: string;
      address: string;
    }
    const body: Body = req.body;

    const newUser = await User.create(body);
    const token = signingFunc(newUser._id as string | object);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      secure: false,
      httpOnly: false,
    });

    res.status(201).json({
      message: "Registered Succesfully",
      newUser,
      token,
    });
  }
);

//@Route            api/v1/auth/login
//@Description      Logging The User In
const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    interface Body {
      email: string;
      password: string;
    }
    const { email, password }: Body = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 401));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.checkCorrectPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    const token = signingFunc(user._id);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      secure: true,
      httpOnly: false,
    });

    res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  }
);

export { login, signUp };
