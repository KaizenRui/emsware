import React from "react";
import MainSidebar from "./MainSidebar";

const MainBody = ({ children }) => {
    return (
        <div className="h-screen flex bg-[#6B7280]">
            <div className="fixed top-[64px] left-0 h-[calc(100vh-64px)] w-[250px]">
                <MainSidebar />
            </div>

            <div className="flex-1 overflow-y-auto h-screen ml-[250px]">
                {children} { }
            </div>

        </div>
    );
};

export default MainBody;