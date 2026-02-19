"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const { user } = useAuth();
  console.log(user);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };
  return (
    <>
      {user ? (
        <nav className="absolute right-8 top-5 flex gap-4">
          <h1>{user.email}</h1>
          <button
            onClick={() => handleLogout()}
            className="border bg-black shadow-md text-white rounded-lg px-8 h-8 cursor-pointer"
          >
            Logout
          </button>
        </nav>
      ) : (
        <nav className="absolute right-8 top-5 flex gap-4">
          <button
            className="border border-gray-300 shadow-md rounded-lg px-8 h-8 cursor-pointer"
            onClick={() => {
              router.push("/sign_up");
            }}
          >
            Signup
          </button>
          <button
            onClick={() => router.push("/login")}
            className="border bg-black shadow-md text-white rounded-lg px-8 h-8 cursor-pointer"
          >
            Login
          </button>
        </nav>
      )}

      <main className=" text-center flex grow items-center justify-center h-screen">
        <div>
          <h1 className="text-4xl font-bold text-primary">
            Start Creating Your Note.
          </h1>
          <Link href="/create_notes">
            <button className="border cursor-pointer px-12 py-2 rounded-xl mt-4 font-semibold  border-gray-800">
              Create
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
