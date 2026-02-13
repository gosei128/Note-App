import CreateNote from "./CreateForm";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
export default function CreateNotePage() {
  return (
    <main className="p-15 border w-full">
      <h1 className="text-6xl font-bold">
        {" "}
        <Link href={"/"}>
          <IoMdArrowRoundBack size={30} />
        </Link>
        Create Note
      </h1>
      <CreateNote />
    </main>
  );
}
