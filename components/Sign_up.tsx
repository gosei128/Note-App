"use client";
import { register } from "@/app/lib/auth";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password != confirmPass) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register(email, password);
      router.push("/");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration Failed";
      setError(errorMessage);
    }
  };
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-1/4">
        <Card className="">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
          </CardHeader>
          <CardContent className=" flex flex-col">
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                type="text"
                required
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
              {error == "Email already exists" ||
                (error == "Invalid email" && (
                  <div className="text-red-500">{error}</div>
                ))}
              <label>Password</label>
              <input
                placeholder="Enter password"
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="p-2 border  border-gray-300 rounded-lg"
                type="password"
              />
              {error == "Passwords do not match" && (
                <div className="text-red-500">
                  <small>{error}</small>
                </div>
              )}
              <label>Confirm Password</label>
              <input
                placeholder="Enter password"
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPass(e.target.value)
                }
                className="p-2 border  border-gray-300 rounded-lg"
                type="password"
              />
              {error == "Passwords do not match" && (
                <div className="text-red-500">
                  <small>{error}</small>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="border text-white bg-black w-full h-10 rounded-lg font-semibold">
              Sign Up
            </button>

            <h6 className="text-xs">
              Already have account?{" "}
              <Link
                href="/login"
                className="text-primary underline font-semibold"
              >
                Login
              </Link>{" "}
            </h6>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
};
export default SignupForm;
