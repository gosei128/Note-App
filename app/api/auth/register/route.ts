import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/model/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.signup({ email, password });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.massage }, { status: 404 });
  }
}
