"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BillOfMaterials() {
  const menuItems = [
    { label: "GENERATE NEW BOM", href: "/dashboard/navigation/billofmaterials/uploadbom" },
    { label: "INSPECT / VIEW BOM", href: "/dashboard/navigation/billofmaterials/viewbom" },
    { label: "REVISE / UPDATE BOM", href: "/dashboard/navigation/billofmaterials/edit" },
    { label: "ARCHIVE / DELETE BOM", href: "/dashboard/navigation/billofmaterials/archive" },
    { label: "EXPORT BOM", href: "/dashboard/navigation/billofmaterials/export" },
    { label: "BOM OVERVIEW / INSIGHTS", href: "/dashboard/navigation/billofmaterials/insights" },
  ];

  const [visible, setVisible] = useState([]);

  useEffect(() => {
    menuItems.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, i]);
      }, i * 200);
    });
  }, []);

  return (
    <div className="mt-24 ml-16 w-[1150px] p-4 grid grid-cols-3 gap-6">
      {menuItems.map((item, idx) => (
        <Link key={idx} href={item.href} className="w-full">
          <div
            className={`
              text-black flex items-center justify-center h-[200px] w-full
              rounded-md cursor-pointer transition-all duration-300
              border font-bold border-gray-400
              hover:bg-gradient-to-r from-blue-200 to-gray-400
              ${visible.includes(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            {item.label}
          </div>
        </Link>
      ))}
    </div>
  );
}
