"use client";
import { useState, useEffect } from "react";

export default function BOMSearchBar({ onSelect }) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    const fetchBOMs = async () => {
      try {
        const res = await fetch(`http://localhost:4000/searchbom?keyword=${encodeURIComponent(keyword)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    };

    fetchBOMs();
  }, [keyword]);

  const handleChange = (e) => setKeyword(e.target.value);

  const handleSelect = (bom) => {
    setKeyword(bom.bom_name);
    setResults([]);
    if (onSelect) onSelect(bom);
  };

  return (
    <div className="mt-20 w-64 relative">
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="ENTER KEYWORD HERE"
        className="w-full border border-black px-2 py-1 outline-none"
      />
      {results.length > 0 && (
        <ul className="absolute w-full border border-gray-300 text-black bg-white max-h-40 overflow-y-auto z-10">
          {results.map((bom) => (
            <li
              key={bom.bom_id}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(bom)}
            >
              {bom.bom_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
