"use client";

import { useState, useEffect } from "react";
import { getNotes } from "@/app/lib/note";
import Link from "next/link";

interface Note {
  _id: string;
  title: string;
}

export default function Sidebar() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (err: any) {
        console.error("failed to load notes", err);
        setError(err.message);
      }
    }

    loadNotes();
  }, []);

  return (
    <nav className="h-screen border border-gray-700 w-1/4 p-2 rounded-br-2xl rounded-tr-2xl">
      <h1 className="text-3xl mt-3 font-bold">Note Taking App</h1>

      <div className="mt-8">
        {notes.map((note) => (
          <div key={note._id} className="mt-2">
            <Link href={`/note_details/${note._id}`}>
              <div className="p-2 border bg-secondary border-gray-700 rounded-md">
                <h1>{note.title}</h1>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
