"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarMenus = {
  Quotation: [
    { name: "BILL OF MATERIALS", href: "/dashboard/navigation/billofmaterials" },
    { name: "INVENTORY", href: "/dashboard/navigation/inventory" },
  ],
  Orders: [
    { name: "RECORDS / ENTRIES", href: "/dashboard/navigation/records" },
    { name: "ANALYTICS", href: "/dashboard/navigation/analytics" },
  ],
  Schedule: [
    { name: "TASKS", href: "/dashboard/navigation/tasks" },
    { name: "CALENDAR", href: "/dashboard/navigation/calendar" },
  ],
  Procurement: [
    { name: "SUPPLIERS", href: "/dashboard/navigation/suppliers" },
    { name: "PURCHASE REQUESTS", href: "/dashboard/navigation/requests" },
  ],
  Inventory: [
    { name: "STOCKS", href: "/dashboard/navigation/stocks" },
    { name: "WAREHOUSE", href: "/dashboard/navigation/warehouse" },
  ],
  Timesheet: [
    { name: "LOGS", href: "/dashboard/navigation/logs" },
    { name: "ATTENDANCE", href: "/dashboard/navigation/attendance" },
  ],
  Shipments: [
    { name: "DELIVERIES", href: "/dashboard/navigation/deliveries" },
    { name: "TRACKING", href: "/dashboard/navigation/tracking" },
  ],
  Settings: [
    { name: "SYSTEM", href: "/dashboard/navigation/system" },
    { name: "ABOUT EMSWARE", href: "/dashboard/navigation/about" },
  ],
};

const MainSidebar = ({ activeNav }) => {
  const pathname = usePathname();
  const currentItems = sidebarMenus[activeNav] || [];

  return (
    <aside className="h-[650px] w-[250px] border-r font-bold border-[#5B6270] flex flex-col items-center gap-[25px] p-2 text-black">
      {currentItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              h-[50px] w-[200px] flex items-center justify-center cursor-pointer
              transform transition-all duration-200
              ${isActive ? "text-blue-900" : "text-black hover:text-blue-800 hover:scale-110"}
            `}
          >
            {item.name}
          </Link>
        );
      })}
    </aside>
  );
};

export default MainSidebar;
