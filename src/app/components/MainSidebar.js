"use client";

import Link from "next/link";

const menuItems = [
  { name: "BILL OF MATERIALS", href: "/dashboard/bom" },
  { name: "INVENTORY", href: "/dashboard/inventory" },
  { name: "RECORDS / ENTRIES", href: "/dashboard/records" },
  { name: "ANALYTICS", href: "/dashboard/analytics" },
  { name: "SUPPORT AI", href: "/dashboard/support" },
  { name: "SYSTEM", href: "/dashboard/system" },
  { name: "ABOUT EMSWARE", href: "/dashboard/about" },
];

const MainSidebar = () => { 
  return (
    <aside className="h-screen w-[250px] border-r font-bold border-[#5B6270] flex flex-col items-center gap-[25px] p-2 text-black">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="h-[50px] w-[200px] flex items-center justify-center hover:text-blue-800 cursor-pointer"
        >
          {item.name}
        </Link>
      ))}
    </aside>
  );
};

export default MainSidebar;
