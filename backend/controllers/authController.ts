import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";
import AppError from "../utils/AppError";
import { type CookieOptions } from "express";


const signingFunc = (payload :  string | object ): string | undefined => {
  if (!process.env.JWT_SECRET) {
    return undefined;
  }

  return jwt.sign({payload}, process.env.JWT_SECRET);
};

//@Route            POST api/v1/auth/login
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
    console.log(newUser._id)
    const token = signingFunc(newUser._id as string | object);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      secure: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "Registered Succesfully",
      newUser,
      token,
    });
  }
);

//@Route            POST api/v1/auth/login
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

    const token = signingFunc(user._id as string | object);

    const cookie_options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      secure: true,
      httpOnly: false,
      sameSite: "none",
    } as CookieOptions;

    res.cookie("jwt", token, cookie_options);

    res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  }
);

interface CustomRequest extends Request {
  user?: JwtPayload;
}

const validateToken = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }
    if (!process.env.JWT_SECRET) {
      return next(new AppError("JWT SECRET OR TOKEN NOT FOUND", 400));
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET, (err : Error | null) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid token",
          });
        } else {
          return res.sendStatus(200);
        }
      });
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  }
);

export { login, signUp, validateToken };
