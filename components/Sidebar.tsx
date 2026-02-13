import Link from "next/link";

interface Note {
  id: number;
  title: string;
}

async function getData(): Promise<Note[]> {
  const res = await fetch("http://localhost:4000/notes", {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

const Sidebar = async () => {
  const notes = await getData();

  return (
    <nav className="h-screen border border-gray-700 w-1/4 p-2 rounded-br-2xl rounded-tr-2xl">
      <h1 className="text-3xl font-bold">Note Taking App</h1>

      <div className="mt-8">
        {notes.map((note) => (
          <div key={note.id}>
            <Link href={`/note/${note.id}`}>
              <div className="p-2 border bg-secondary border-gray-700 rounded-md">
                <h1>{note.title}</h1>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
