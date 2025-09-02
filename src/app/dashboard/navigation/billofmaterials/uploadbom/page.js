"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UploadForm from "./UploadForm";
import StatusMessage from "./StatusMessage";

export default function BomUploadPage() {
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => setShow(true), []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className={`bg-gray-300 text-black rounded-md shadow-lg p-6 w-[500px] relative
        transform transition-all duration-300 ease-out
        ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>

        <button
          onClick={() => router.push("/dashboard/navigation/billofmaterials")}
          className="absolute top-3 right-3 text-red-500 font-bold text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-black">Bill of Materials</h2>

        {status !== "BOM Generation Successful" && (
          <UploadForm onStatusChange={setStatus} />
        )}

        <StatusMessage status={status} />
      </div>
    </div>
  );
}
