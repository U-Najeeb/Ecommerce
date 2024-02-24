import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const globalErrorController = (
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  error.status = error.status || "Error";
  error.statusCode = error.statusCode || 400;

  if (process.env.NODE_ENV === "development") {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      ErrorStack: error.stack,
      error,
    });
  } else if (process.env.NODE_ENV === "production") {
    if (error.isOperational === true) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: "Error",
        message: "Something went wrong please try again later ",
      });
    }
  }
};

export default globalErrorController;
