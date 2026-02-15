import mongoose from "mongoose";
import path from "path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), "app", ".env") });

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/NoteApp";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(MONGODB_URI);
};
