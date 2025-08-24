"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "BILL OF MATERIALS", href: "/dashboard/navigation/billofmaterials" },
  { name: "INVENTORY", href: "/dashboard/navigation/inventory" },
  { name: "RECORDS / ENTRIES", href: "/dashboard/navigation/records" },
  { name: "ANALYTICS", href: "/dashboard/navigation/analytics" },
  { name: "SUPPORT AI", href: "/dashboard/navigation/support" },
  { name: "SYSTEM", href: "/dashboard/navigation/system" },
  { name: "ABOUT EMSWARE", href: "/dashboard/navigation/about" },

];

const MainSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-[250px] border-r font-bold border-[#5B6270] flex flex-col items-center gap-[25px] p-2 text-black">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`h-[50px] w-[200px] flex items-center justify-center cursor-pointer
            ${pathname.startsWith(item.href) ? "text-blue-900" : "hover:text-blue-800"}`}
        >
          {item.name}
        </Link>
      ))}
    </aside>
  );
};

export default MainSidebar;
