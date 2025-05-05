export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-3 py-2 rounded"
      />
    </div>
  );
}
