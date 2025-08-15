"use client";
import Link from "next/link";


import React, { useState } from "react";

export default function EmcGenerate() {
  const [inputs, setInputs] = useState({
    emc: "",
    custpn: "",
    value: "",
    mpn1: "",
    mpn2: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStockcode = async () => {
    const allEmpty = Object.values(inputs).every(
      (val) => val.trim() === ""
    );
    if (allEmpty) {
      setStatus("Please fill at least one field");
      return;
    }
    if (!inputs.emc.trim() && !inputs.custpn.trim()) {
      setStatus("Please enter at least EMC or Customer Part Number");
      return;
    }

    try {
      // Check duplicates first
      const checkResponse = await fetch("http://localhost:4000/partduplicheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emc: inputs.emc.trim(), custpn: inputs.custpn.trim() }),
      });
      const checkData = await checkResponse.json();

      if (checkData.exists) {
        setStatus("WARNING: EMC PN / CUSTOMER PN already exists. Recheck and Try Again!");
        return;
      }

      // If no duplicate, proceed to add
      const addResponse = await fetch("http://localhost:4000/partadd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      if (!addResponse.ok) throw new Error("Failed to add");

      await addResponse.json();

      setStatus("Stockcode added successfully");
      setInputs({
        emc: "",
        custpn: "",
        value: "",
        mpn1: "",
        mpn2: "",
      });
    } catch (error) {
      setStatus("Error adding stockcode");
    }
  };

  return (
    <div>
      <span className="font-bold">Generate Stockcode</span>
      <br />
      <br />
      <input
        name="emc"
        value={inputs.emc}
        onChange={handleChange}
        placeholder="EMC Stockcode"
      />
      <input
        name="custpn"
        value={inputs.custpn}
        onChange={handleChange}
        placeholder="Customer Part Number"
      />
      <input
        name="value"
        value={inputs.value}
        onChange={handleChange}
        placeholder="Value (optional)"
      />
      <input
        name="mpn1"
        value={inputs.mpn1}
        onChange={handleChange}
        placeholder="Manufacturer PN 1"
      />
      <input
        name="mpn2"
        value={inputs.mpn2}
        onChange={handleChange}
        placeholder="Manufacturer PN 2"
      />
        <button onClick={handleAddStockcode}>Add Stockcode</button>
        <div>{status}</div> <br />
        <div>
        <Link href="/dashboard">Back to Dashboard</Link>
        </div>

    </div>
  );
}
