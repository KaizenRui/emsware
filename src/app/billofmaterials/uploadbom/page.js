"use client";
import Link from "next/link"; // <-- you must have this

import React, { useState } from "react";

export default function BomUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus("Please select an Excel file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:4000/bomupload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        setStatus(result.message || "File uploaded successfully!");
      } else {
        setStatus(result.error || "Upload failed.");
      }
    } catch (error) {
      setStatus("Upload error: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "Arial" }}>
      <h2>Upload BOM Excel File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button type="submit" style={{ marginTop: 10 }}>
          Upload
        </button>
      </form>
      {status && <p style={{ marginTop: 10 }}>{status}</p>} <br />
      <div>
        <Link href="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
}
