"use client";
import BOMTableHeader from "./BOMTableHeader";

function TableRow({ row }) {
  return (
    <div className="grid grid-cols-8 text-center border-b border-black">
      {Object.keys(row).map((key) => (
        <div key={key} className="border border-black px-2 py-1 break-words">
          {row[key]}
        </div>
      ))}
    </div>
  );
}

export default function BOMTableBody({ rows, loading }) {
  return (
    <div className="mt-2 h-[600px] border border-black rounded-md overflow-auto">
      <BOMTableHeader />
      {loading
        ? null
        : rows.length === 0
        ? null
        : rows.map((row, i) => <TableRow key={i} row={row} />)}
    </div>
  );
}
