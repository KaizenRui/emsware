"use client";
import React, { useState, useEffect } from "react";
import MainHeader from "./MainHeader";
import MainSidebar from "./MainSidebar";
import { usePathname } from "next/navigation";

const MainBody = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(""); // ✅ added activeNav state
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [pathname]);

  return (
    <div className="mainbody flex flex-col bg-gray-200 mx-2.5">
      {/* ✅ pass props */}
      <MainHeader
        setSidebarOpen={setSidebarOpen}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      <div className="lowermainbody flex flex-1 mt-[-25px]">
        {sidebarOpen && (
          <div className="fixed top-[50px] left-0 h-[calc(100vh-50px)] w-[250px] bg-gray-100 shadow-lg z-10">
            {/* ✅ pass activeNav */}
            <MainSidebar activeNav={activeNav} />
          </div>
        )}

        <div className={`flex-1 overflow-y-auto p-4 ${sidebarOpen ? "ml-[100px]" : ""}`}>
          {children || (
            <div className="mainpagetext-gray-500">
              Click a menu from the top navigation to open the sidebar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainBody;
 