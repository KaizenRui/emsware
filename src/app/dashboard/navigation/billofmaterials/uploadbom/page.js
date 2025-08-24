"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BomUploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus("PLEASE ATTACH SOME FILES AND TRY AGAIN!");
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
        setFile(null);
        setStatus("BOM Generation Successful");
      } else {
        setStatus(result.error || "Error Occured");
      }
    } catch (error) {
      setStatus("Warning: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#1f2937] rounded-md shadow-lg p-6 w-[500px] relative">

        <button
          onClick={() => router.push("/dashboard/navigation/billofmaterials")}
          className="absolute top-3 right-3 text-white font-bold text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-white">Bill of Materials</h2>

        {status !== "BOM Generation Successful" ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-max"
            >
              Upload
            </button>
          </form>
        ) : null}

        {status && (
          <p
            className={`mt-2 font-semibold ${status === "BOM Generation Successful"
                ? "text-green-500"
                : "text-red-500"
              }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
