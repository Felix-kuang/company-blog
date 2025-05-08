export default function DataTable({
  columns = [],
  data = [],
  onEdit,
  onDelete,
}) {
  const hasActions = !!onEdit || !!onDelete;
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="py-3 px-4 text-left font-medium">
                {col.header}
              </th>
            ))}
            {hasActions && (
              <th className="py-3 px-4 text-left font-medium">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-t border-gray-200 hover:bg-gray-50 transition-all"
            >
              {columns.map((col) => (
                <td key={col.key} className="py-4 px-6">
                  {typeof col.render === "function"
                    ? col.render(row[col.key], row)
                    : row[col.key]}
                </td>
              ))}
              {hasActions && (
                <td className="py-4 px-6 space-x-3">
                    {onEdit && <button className="text-blue-600 hover:text-blue-800" onClick={()=>onEdit(row)}>
                      Edit
                    </button>}
                    {onDelete && <button className="text-red-600 hover:text-red-800" onClick={()=>onDelete(row)}>
                      Delete
                    </button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
