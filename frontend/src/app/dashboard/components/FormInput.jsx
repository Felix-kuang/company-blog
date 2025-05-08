export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
    rows=3
}) {
  return (
    <div className="my-5">
        <label className="block font-medium mb-1">{label}</label>

        {/* Cek apakah type adalah 'textarea' */}
        {type === "textarea" ? (
            <textarea
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows} // Setting row untuk textarea
                className="w-full border border-gray-300 px-3 py-2 rounded"
            />
        ) : (
            <input
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-300 px-3 py-2 rounded"
            />
        )}
    </div>
  );
}
