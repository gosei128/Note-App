import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/model/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

const createToken = (_id: mongoose.Types.ObjectId) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET!, { expiresIn: "3d" });
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.signup({ email, password });
    const token = createToken(user._id);

    const res = NextResponse.json({ user }, { status: 201 });
    res.cookies.set("jwt", token, {
      // set cookies
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    });
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
