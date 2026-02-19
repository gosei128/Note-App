"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/auth";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    try {
      await login(email, password);
      router.push("/");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login Failed";
      setError(errorMessage);
    }
  };
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-1/4">
        <Card className="">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </CardHeader>
          <CardContent className=" flex flex-col">
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                type="text"
                required
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
              {error && <div className="text-red-500">{error}</div>}
              <label>Password</label>
              <input
                placeholder="Enter password"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="p-2 border  border-gray-300 rounded-lg"
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="border text-white bg-black w-full h-10 rounded-lg font-semibold">
              Login
            </button>

            <h6 className="text-xs">
              Don&apos;t have account yet?{" "}
              <Link
                href="/sign_up"
                className="text-primary underline font-semibold"
              >
                Sign Up
              </Link>{" "}
            </h6>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
};

export default Login;
