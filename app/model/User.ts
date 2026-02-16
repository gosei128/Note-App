import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthResults {
  user: { _id: string; email: string };
  token: string;
}

export interface IUserModel extends Model<IUser> {
  signup(email: string, password: string): Promise<IAuthResults>;
  login(email: string, password: string): Promise<IAuthResults>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.signup = async function (
  email: string,
  password: string,
): Promise<IAuthResults> {
  console.log("Signup called with:", { email, password }); // Add this

  //verification
  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("This email already exist");
  }
  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: "3d" },
  );

  return {
    user: {
      _id: user._id.toString(),
      email: user.email,
    },
    token,
  };
};

userSchema.statics.login = async function (
  email: string,
  password: string,
): Promise<IAuthResults> {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: "3d" },
  );

  return {
    user: {
      _id: user._id.toString(),
      email: user.email,
    },
    token,
  };
};
export default (mongoose.models.User ||
  mongoose.model<IUser, IUserModel>("User", userSchema)) as IUserModel;
