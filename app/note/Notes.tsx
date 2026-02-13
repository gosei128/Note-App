import Link from "next/link";
const NoteDashboard = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-gray-700 text-5xl font-bold">Create Your Notes.</h1>
        <button className="border cursor-pointer px-8 py-2 rounded-xl bg-black mt-4">
          <Link href="/create_note">Create</Link>
        </button>
      </div>
    </main>
  );
};

export default NoteDashboard;
