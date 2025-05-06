import { XIcon } from "lucide-react";
export default function SidebarHeader({ setOpen }) {
  return (
    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
          <span className="text-white font-bold">D</span>
        </div>
        <span className="text-xl font-semibold text-gray-800">Dashboard</span>
      </div>
      <button
        className="md:hidden text-gray-500 hover:text-gray-700"
        onClick={() => setOpen(false)}
      >
        <XIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
