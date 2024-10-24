import mongoose from "mongoose";
import { DB_URL } from "../config/serverConfig";
export default async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log(`connection established`);
  } catch (error) {
    console.log(error);
  }
}
