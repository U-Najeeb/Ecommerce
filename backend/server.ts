import express from "express";
import { configDotenv } from "dotenv";
import connectToDb from "./config/connectToDb";
import cors from "cors"

configDotenv(); 
const app = express(); // Creating a server
connectToDb(); //Connecting to database
app.use(express.json())
app.use(cors())


app.listen(process.env.PORT, () => {
  console.log("Server is running on PORT", process.env.PORT);
});
