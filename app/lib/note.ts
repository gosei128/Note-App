interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
import { getToken } from "@/app/lib/auth";
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const getNotes = async (): Promise<Note[]> => {
  const response = await fetch("http://localhost:3000/api/notes", {
    headers: authHeaders(),
  });
  const data = await response.json();

  return data.notes as Note[];
};

export const getNote = async (id: string): Promise<Note> => {
  const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
    headers: authHeaders(),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error);

  return data.note;
};

export const createNote = async (
  title: string,
  content: string,
): Promise<Note> => {
  const response = await fetch("http://localhost:3000/api/notes", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title, content }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error);

  return data.note;
};
