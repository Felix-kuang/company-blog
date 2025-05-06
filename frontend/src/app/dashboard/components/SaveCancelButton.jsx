export default function SaveCancelButtons({ onSave, onCancel }) {
  return (
    <div className="space-x-2">
      <button
        type="button"
        onClick={onSave}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 active:scale-[0.97]"
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 active:scale-[0.97]"
      >
        Cancel
      </button>
    </div>
  );
}
