export default function AddButton({ label, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-green-500 hover:bg-green-600 text-white font-medium flex-col mb-5 px-4 rounded-md shadow-md transition ${className}`}
    >
      {label}
    </button>
  );
}
