import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt?: string;
}

async function getNote(id: string): Promise<Note | null> {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await getNote(id);
  if (!note) {
    return (
      <main className="p-12">
        <p>Note not found.</p>
      </main>
    );
  }
  return (
    <main className="p-12">
      <Link href="/">
        <IoMdArrowRoundBack size={35} className="cursor-pointer" />
      </Link>
      <h1 className="text-4xl font-bold">{note.title}</h1>
      <p className="mt-4 text-xl whitespace-pre-wrap">{note.content}</p>
    </main>
  );
}
