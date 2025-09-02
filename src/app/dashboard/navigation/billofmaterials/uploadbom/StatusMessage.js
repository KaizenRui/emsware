"use client";

export default function StatusMessage({ status }) {
  if (!status) return null;

  const color = status === "BOM Generation Successful" ? "text-green-500" : "text-red-500";

  return <p className={`mt-2 font-semibold ${color}`}>{status}</p>;
}
