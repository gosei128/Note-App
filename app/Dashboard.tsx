import Link from "next/link";
const Dashboard = () => {
  return (
    <main className="border text-center flex items-center justify-center h-screen">
      <div>
        <h1 className="text-4xl font-bold text-primary">
          Start Creating Your Note.
        </h1>
        <Link href="/create_notes">
          <button className="border px-12 py-2 rounded-xl mt-4 font-semibold bg-black border-gray-800">
            Create
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Dashboard;
