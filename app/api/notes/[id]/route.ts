import { connectDB } from "@/app/lib/mongodb";
import Note from "@/app/model/Note";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
  }
  const note = await Note.findById(id);
  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }
  return NextResponse.json(note);
}
