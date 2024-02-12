import express, { NextFunction, Request, Response } from "express";
import { configDotenv } from "dotenv";
import connectToDb from "./config/connectToDb";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import AppError from "./utils/AppError";
import globalErrorController from "./controllers/errorController";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes";

configDotenv();
const app = express(); // Creating a server
connectToDb(); // Connecting to database
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

app.use("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorController);

app.listen(process.env.PORT, () => {
  console.log("Server is running on PORT", process.env.PORT);
});