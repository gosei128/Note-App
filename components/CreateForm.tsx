"use client";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function CreateNote() {
  return (
    <form className="mt-12">
      <input
        type="text"
        placeholder="Title"
        className="text-4xl outline-0 border-b-1 h-15 p-2 w-full"
        name=""
        id=""
      />
      <textarea
        name=""
        placeholder="Content"
        className="text-3xl outline-0 mt-5 w-full"
        id=""
      ></textarea>
    </form>
  );
}
