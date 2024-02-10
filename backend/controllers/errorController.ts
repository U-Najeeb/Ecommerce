import { Request, Response } from "express";
import AppError from "../utils/AppError";

const globalErrorController = (err: AppError, _req: Request, res: Response) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

export default globalErrorController;
