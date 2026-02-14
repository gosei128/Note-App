import { connectDB } from "@/app/lib/mongodb";
import Note from "@/app/model/Note";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const notes = await Note.find();
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();
  const newNote = await Note.create({
    title: body.title,
    content: body.content,
  });
  return NextResponse.json(newNote);
}
