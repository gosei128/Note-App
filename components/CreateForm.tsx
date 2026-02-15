"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNote() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      const newNote = await res.json();
      router.refresh();
      router.push(`/note_details/${newNote._id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12">
      <input
        type="text"
        placeholder="Title"
        required
        className="text-4xl outline-0 border-b-1 h-15 p-2 w-full"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        name=""
        id=""
      />
      <textarea
        name=""
        placeholder="Content"
        required
        className="text-2xl outline-0 resize-none h-76 border mt-5 w-full"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        id=""
      ></textarea>
      <button className="border px-12 py-2 rounded-xl self-end">Save</button>
    </form>
  );
}
