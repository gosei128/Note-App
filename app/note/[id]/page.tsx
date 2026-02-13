import { notFound } from "next/navigation";

async function getNote(id: string) {
  const res = await fetch(`http://localhost:4000/notes/${id}`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

const NoteDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const notes = await getNote(id);

  return (
    <main className="p-12 w-1/2 ">
      <h1 className="text-6xl font-bold">{notes.title}</h1>
      <p className="mt-12">{notes.body}</p>
    </main>
  );
};

export default NoteDetails;
