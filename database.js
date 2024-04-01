import { connect } from "mongoose";
import { config } from "dotenv";
config();

export async function connectToDatabase() {
  try {
    await connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
