"use client";
import { useState } from "react";
import BOMSearchBar from "./components/BOMSearchBar";
import BOMTableBody from "./components/BOMTableBody";

export default function ViewBillofmaterials() {
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBOM, setSelectedBOM] = useState(null);

  const handleSelectBOM = async (bom) => {
    setSelectedBOM(bom);
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:4000/bomquery?bom_name=${encodeURIComponent(bom.bom_name)}`
      );

      const data = await res.json();
      setFilteredRows(data);
    } catch (err) {
      console.error("Error fetching BOM items:", err);
      setFilteredRows([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-5 w-[1250px]">
      <BOMSearchBar onSelect={handleSelectBOM} />
      <BOMTableBody rows={filteredRows} loading={loading} />
    </div>
  );
}
