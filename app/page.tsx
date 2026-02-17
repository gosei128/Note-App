import Sidebar from "@/components/Sidebar";
import Dashboard from "./Dashboard";
export default function Home() {
  return (
    <div className=" w-screen flex ">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
