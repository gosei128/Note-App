import { NextRequest, NextResponse } from "next/server";
import User from "@/app/model/User";
import { connectDB } from "@/app/lib/mongodb";
interface RegisterReqBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const body: RegisterReqBody = await request.json();

    const { email, password } = body;

    const { user, token } = await User.signup(email, password);

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
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
