export default function Navbar({}) {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl">Admin Dashboard</h1>
      <button className="bg-red-600 py-1 px-3 rounded-md">Logout</button>
    </div>
  );
}
