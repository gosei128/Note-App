import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/model/User";
import { NextRequest, NextResponse } from "next/server";

interface LoginReqBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const body: LoginReqBody = await request.json();
    const { email, password } = body;

    //Call the static method from User model

    const { user, token } = await User.login(email, password);

    return NextResponse.json(
      {
        user: {
          _id: user._id,
          email: user.email,
        },
        token,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An Error occured";
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
