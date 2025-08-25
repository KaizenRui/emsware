"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BomUploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false); // new state for animation
  const router = useRouter();

  useEffect(() => {
    setShow(true); // triggers floating animation on mount
  }, []);

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
      <div
        className={`bg-gray-300 text-black rounded-md shadow-lg p-6 w-[500px] relative
          transform transition-all duration-300 ease-out
          ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
      >

        <button
          onClick={() => router.push("/dashboard/navigation/billofmaterials")}
          className="absolute top-3 right-3 text-red-500 font-bold text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-black">Bill of Materials</h2>

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
