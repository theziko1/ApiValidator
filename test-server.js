import express from "express";
import { config } from "dotenv";
import { connectToDatabase } from "./database.js";
import userRouter from "./routes/User.js";

// connectToDatabase();
config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/", userRouter);


export default app;
