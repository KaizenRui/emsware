import React from "react";
import { FaBars } from "react-icons/fa";

const MainHeader = () => {
  return (
    <div className="HEADER bg-green-500 flex justify-between items-center px-4 h-10 mb-2">
        <div>Menu</div>
        <div><FaBars className="cursor-pointer" /></div>
    </div>
  )
};

export default MainHeader;
