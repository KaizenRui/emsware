"use client";

const columns = [
  { key: "designators", label: "DESIGNATORS" },
  { key: "value", label: "VALUE" },
  { key: "process", label: "PROCESS" },
  { key: "pcbSide", label: "PCB SIDE" },
  { key: "quantity", label: "QUANTITY" },
  { key: "emcStockCode", label: "EMC STOCKCODE" },
  { key: "customerPartNumber", label: "CUSTOMER PARTNUMBER" },
  { key: "manufacturerPN", label: "MANUFACTURER PN" },
];

export default function BOMTableHeader() {
  return (
    <div className="grid grid-cols-8 sticky top-0 bg-green-500 text-black border-b border-black text-center font-medium">
      {columns.map((col) => (
        <div
          key={col.key}
          className="border border-black font-bold px-2 py-0.5 text-sm break-words"
        >
          {col.label}
        </div>
      ))}
    </div>
  );
}
