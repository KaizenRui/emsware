"use client";
import { useState, useEffect } from "react";
import BOMSearchBar from "./components/BOMSearchBar";
import BOMTableBody from "./components/BOMTableBody";

export default function ViewBillofmaterials() {
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBOM, setSelectedBOM] = useState(null);

  const [showTable, setShowTable] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {

    setShowTable(true);

    const timer = setTimeout(() => {
      setShowSearchBar(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="ml-5 w-[1250px] relative"> {}

      <div
        className={`transition-transform duration-200 ease-out relative z-20
          ${showSearchBar ? "translate-x-0 opacity-100" : "-translate-x-48 opacity-0"}`}
      >
        <BOMSearchBar onSelect={handleSelectBOM} />
      </div>

      <div
        className={`relative transform transition-all duration-200 ease-out z-10
          ${showTable ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
      >
        <BOMTableBody rows={filteredRows} loading={loading} />
      </div>
    </div>
  );
}
