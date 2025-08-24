"use client";

const columns = [
  { key: "emcStockCode", label: "EMC STOCKCODE" },
  { key: "quantity", label: "QUANTITY" },
  { key: "designators", label: "DESIGNATORS" },
  { key: "pcbSide", label: "PCB SIDE" },
  { key: "customerPartNumber", label: "CUSTOMER PARTNUMBER" },
  { key: "value", label: "VALUE" },
  { key: "manufacturerPN", label: "MANUFACTURER PN" },
  { key: "process", label: "PROCESS" },
];

export default function BOMTableHeader() {
  return (
    <div className="grid grid-cols-8 sticky top-0 bg-gray-400 text-black border-b border-black text-center font-medium">
      {columns.map((col) => (
        <div
          key={col.key}
          className="border border-black px-2 py-0.5 text-sm break-words"
        >
          {col.label}
        </div>
      ))}
    </div>
  );
}
