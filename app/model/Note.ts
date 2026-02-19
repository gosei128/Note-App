import mongoose, { Document, Model } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: mongoose.Types.ObjectId;
}

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = (mongoose.models.Note ||
  mongoose.model<INote>("Note", NoteSchema)) as Model<INote>;

export default Note;
