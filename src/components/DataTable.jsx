function DataTable({ columns, rows }) {
  return (
    <div className="scrollbar-thin -mx-6 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-y border-slate-100 bg-slate-50/80">
            {columns.map((column) => (
              <th
                key={column.key}
                className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                No records available.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index} className="transition-colors hover:bg-slate-50/80">
                {columns.map((column) => (
                  <td key={column.key} className="whitespace-nowrap px-6 py-4 text-slate-700">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
