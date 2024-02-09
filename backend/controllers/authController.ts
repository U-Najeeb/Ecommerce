import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const signingFunc = (payload: string | object) => {

  if (!process.env.JWT_SECRET) {
    return undefined;
  }
  return jwt.sign(payload, process.env.JWT_SECRET);
};

//@Route            api/v1/auth/login
//@Description      Logging The User In
const signUp = catchAsync(async(req: Request, res: Response): Promise<void> => {
    interface Body {
        fName : string,
        lName : string,
        email : string,
        password : string,
        address : string,
    }
    const body : Body = req.body;

    const newUser = await User.create(body)

    const token = signingFunc(newUser._id)

    res.cookie("jwt", token, {
        expires  : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        secure : false,
        httpOnly : false
    })

    res.status(201).json({
        message : "Registered Succesfully",
        newUser,
        token
    })
});


//@Route            api/v1/auth/login
//@Description      Logging The User In
const login = catchAsync((req: Request, res: Response) => {});

export { login, signUp };
