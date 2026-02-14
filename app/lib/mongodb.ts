import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/NoteApp";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(MONGODB_URI);
};
