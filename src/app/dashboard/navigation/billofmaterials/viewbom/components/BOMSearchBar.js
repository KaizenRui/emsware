"use client";
import { useState, useEffect } from "react";

export default function BOMSearchBar({ onSelect }) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [skipFetch, setSkipFetch] = useState(false); // 🔹 added flag

  useEffect(() => {
    if (!keyword.trim() || skipFetch) {
      setResults([]);
      setSkipFetch(false); // reset after skipping
      return;
    }

    const fetchBOMs = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/billofmaterials/searchBOM?keyword=${keyword}`
        );
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
    setSkipFetch(true); // 🔹 prevent fetch on selection
    document.activeElement.blur();
    if (onSelect) onSelect(bom);
  };

  const HamburgerIcon = () => {
    const menuOptions = ["OPTION 1", "OPTION 2", "OPTION 3"];

    return (
      <div className="relative">
        <div
          className="w-10 h-10 flex flex-col justify-center items-center cursor-pointer space-y-1 bg-gray-200 px-2 py-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </div>

        {isOpen && (
          <ul className="absolute text-sm text-black right-0 mt-2 w-40 bg-cyan-300 border border-gray-300 shadow-lg z-20 rounded-md overflow-hidden break-words">
            {menuOptions.map((option, idx) => (
              <li
                key={idx}
                className="px-4 py-2 font-bold text-center hover:bg-gray-400 border border-gray-400 cursor-pointer transition-colors duration-200"
                onClick={() => {
                  console.log(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="mt-20 flex justify-between">
      <div className="w-64 relative">
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder="ENTER KEYWORDS HERE"
          className="w-full border border-black px-2 py-1 outline-none bg-gray-400 placeholder-gray-300"
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
      <HamburgerIcon />
    </div>
  );
}
