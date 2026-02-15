import mongoose from "mongoose";
import bcrypt from "bcrypt";
type UserInfo = {
  email: string;
  password: string;
};

interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
}

const UserAuth = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserAuth.statics.signup = async function ({ email, password }: UserInfo) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("This email already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

interface IUserModel extends mongoose.Model<IUser> {
  signup(userInfo: UserInfo): Promise<IUser>;
}

const User: IUserModel = (mongoose.models.User ??
  mongoose.model<IUser, IUserModel>("User", UserAuth)) as IUserModel;

export default User;
