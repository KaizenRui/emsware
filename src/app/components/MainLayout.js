import React from "react";
import MainHeader from "./MainHeader";
import MainBody from "./MainBody";
import Link from "next/link";
const MainLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <MainHeader />
      <MainBody>{children}</MainBody>
    </div>
  );
};


export default MainLayout;
