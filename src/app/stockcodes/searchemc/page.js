"use client";

import React, { useState } from 'react';

export default function EmcSearch() {
  const [stockcode, setStockcode] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!stockcode) {
      setResults([]);
      return;
    }

    fetch('http://localhost:4000/stocksearch', {
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
      <input
        value={stockcode}
        onChange={e => setStockcode(e.target.value)}
        placeholder="Type stockcode"
      />
      <button onClick={handleSearch}>Search</button>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}
