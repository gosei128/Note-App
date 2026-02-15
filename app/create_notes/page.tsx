import CreateNote from "@/components/CreateForm";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
export default function CreateForm() {
  return (
    <main className="p-12">
      <Link href="/">
        <IoMdArrowRoundBack size={35} className="cursor-pointer" />
      </Link>
      <h1 className="text-5xl font-bold">Create Note</h1>
      <CreateNote />
    </main>
  );
}
