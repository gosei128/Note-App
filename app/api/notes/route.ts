import { verifyToken } from "@/app/lib/middleware";
import { connectDB } from "@/app/lib/mongodb";
import Note from "@/app/model/Note";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { userId } = verifyToken(req);

    const notes = await Note.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { userId } = verifyToken(req);
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const note = await Note.create({ title, content, userId });

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}
