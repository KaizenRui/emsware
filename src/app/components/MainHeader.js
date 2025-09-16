"use client"; 
import Link from "next/link";

const navItems = [
  "Quotation",
  "Orders",
  "Schedule",
  "Procurement",
  "Inventory",
  "Timesheet",
  "Shipments",
  "Settings",
];

const MainHeader = ({ setSidebarOpen, activeNav, setActiveNav }) => { 
  return (
    <div className="mainheader fixed top-0 left-0 z-10 flex items-center h-[50px] w-screen border-b-2 border-gray-400 bg-gray-200 px-4">
      <div className="flex items-center pl-12">
        <Link href="/dashboard">
          <span className="text-2xl font-bold cursor-pointer">
            <span className="text-blue-800">EMS</span>
            <span className="text-black">WARE</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 flex justify-between px-5 ml-12 text-black">
        {navItems.map((item) => {
          const isActive = activeNav === item;
          return (
            <span
              key={item}
              className={`
                font-bold cursor-pointer px-2
                ${isActive ? "text-blue-900 underline" : "hover:text-blue-600"}
              `}
              onClick={() => {
                setActiveNav(item);  
                setSidebarOpen(true); 
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MainHeader;
