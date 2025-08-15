"use client";
import Link from "next/link";

import React, { useState } from 'react';

export default function EmcGenerate() {
  const [stockcode, setStockcode] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!stockcode) {
      setResults([]);
      return;
    }

    fetch('http://localhost:4000/partsearch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stockcode }),
    })
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(() => setResults([]));
  };

  return (
    <div>
      <span className="font-bold mb-4 block">Search Part Number</span>
      <input
        value={stockcode}
        onChange={e => setStockcode(e.target.value)}
        placeholder="EMC PN / Customer PN"
      />
      <button onClick={handleSearch}>Search</button>
      <pre>{JSON.stringify(results, null, 2)}</pre> <br />
      <div>
      <Link href="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
}
