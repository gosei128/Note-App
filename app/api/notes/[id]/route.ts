import { connectDB } from "@/app/lib/mongodb";
import Note from "@/app/model/Note";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/middleware";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    await connectDB();

    const { id } = await params;
    const { userId } = verifyToken(request);

    const note = await Note.findOne({ _id: id, userId });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 },
    );
  }
}
