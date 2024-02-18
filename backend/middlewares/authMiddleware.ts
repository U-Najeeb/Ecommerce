import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import { promisify } from "util";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";

interface RequestType extends Request {
  user?: JwtPayload;
}
const protect = async (req: RequestType, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split("jwt=")[1];
  }

  if (!token) {
    return next(new AppError("Please log in first", 400));
  }

  if (!process.env.JWT_SECRET) {
    return next(new AppError("JWT SECRET OR TOKEN NOT FOUND", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  const currentUser = await User.findById(decoded.payload);

  if (!currentUser) {
    return next(new AppError("This user no longer exists", 401));
  }

  req.user = currentUser;

  next();
};

export default protect;
