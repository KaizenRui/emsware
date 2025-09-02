"use client";
import { useState, useEffect } from "react";

export default function CustomerSelect({ value: parentValue, onChange }) {
  // Local state for active selection inside the component
  const [activeCustomer, setActiveCustomer] = useState(parentValue || "");

  // Keep local state in sync if parent value changes
  useEffect(() => {
    setActiveCustomer(parentValue);
  }, [parentValue]);

  const handleSelect = e => {
    const val = e.target.value;
    setActiveCustomer(val);  // update local state
    onChange(val);           // notify parent
  };

  const customers = ["Ingo", "Digiflex", "Yahorng"]; // hardcoded list

  return (
    <select
      value={activeCustomer}
      onChange={handleSelect}
      className="border p-2 rounded"
    >
      <option value="">(Select Customer)</option>
      {customers.map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}
