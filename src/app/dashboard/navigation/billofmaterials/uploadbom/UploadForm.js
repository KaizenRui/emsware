"use client";
import { useState, useEffect } from "react";
import CustomerSelect from "./CustomerSelect";

export default function UploadForm({ onStatusChange }) {
  const [form, setForm] = useState({
    file: null,
    description: "",
    customer: "",
    revisionno: "",   
    revisionDate: "",
  });

  useEffect(() => {
    setForm(f => ({ ...f, revisionDate: new Date().toISOString().split("T")[0] }));
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
    if (name === "file") onStatusChange("");
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.file) return onStatusChange("Attach a file first!");
    if (!form.description || !form.customer || !form.revisionno) 
      return onStatusChange("Complete all fields!");

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === "revisionno") data.append(k, Number(v)); 
      else data.append(k, v);
    });

    try {
      const res = await fetch("http://localhost:4000/uploadBOM", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      onStatusChange(res.ok ? "BOM Generation Successful" : json.error || "Error Occurred");

      if (res.ok) {
        setForm(f => ({
          ...f,
          file: null,
          description: "",
          customer: "",
          revisionno: "", 
        }));
      }
    } catch (err) {
      onStatusChange("Warning: " + err.message);
    }
  };

  const fields = [
    { label: "Upload File", type: "file", name: "file", accept: ".xlsx", required: true },
    { label: "Description", type: "text", name: "description", placeholder: "Upload Description", required: true },
    { label: "Customer", type: "select", name: "customer", required: true, placeholder: "(Select Customer)" }, // 👈 cleaned
    { label: "Revision #", type: "select", name: "revisionno", options: [0, 1, 2, 3, 4, 5], required: true, placeholder: "(Revision Number)" },
    { label: "Revision Date", type: "text", name: "revisionDate", readOnly: true, required: true }
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
      {fields.map(f =>
        f.name === "customer" ? (
          <CustomerSelect
            key="customer"
            value={form.customer}
            onChange={val => setForm(fm => ({ ...fm, customer: val }))}
          />
        ) : f.type === "select" ? (
          <select
            key={f.name}
            name={f.name}
            value={form[f.name]}
            onChange={handleChange}
            className="border p-2 rounded"
            required={f.required}
          >
            <option value="" disabled hidden>
              {f.placeholder || f.label}
            </option>
            {f.options.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        ) : (
          <input
            key={f.name}
            {...f}
            value={f.type === "file" ? undefined : form[f.name]}
            onChange={handleChange}
            className={`border p-2 rounded ${f.readOnly ? "bg-gray-100" : ""}`}
          />
        )
      )}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-max">
        Upload
      </button>
    </form>
  );
}
