import React from "react";

const MainBody = ({ children }) => {
    return (
        <div className="h-screen flex flex-1">
            <div className="w-[250px] border">Sidebar</div>
            <div>{children}</div>
        </div>
    );
};

export default MainBody;
