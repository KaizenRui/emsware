  import React from "react";
  import MainHeader from "./MainHeader";
  import { MdOutlineDisplaySettings } from "react-icons/md";
  import { RiHomeLine } from "react-icons/ri";
  import { MdLightbulbOutline } from "react-icons/md";
  import Link from "next/link";

  const MainLayout = ({ children }) => {
    return (
      <div className="MAIN bg-gray-400 w-screen min-h-screen">
        <MainHeader />
        <div className="BODY flex justify-start items-start">
          <aside className="bg-blue-500  rounded-lg w-60 p-4 min-h-screen">
            <ul>
              <li className="flex justify-start items-center hover:bg-cyan-500 hover:text-red-500 rounded-xl p-1">
                <RiHomeLine className="mr-2" />
                <Link href="/">HOME</Link> 
              </li>
              <li className="flex justify-start items-center hover:bg-cyan-500 hover:text-red-500 rounded-xl p-1">
                <MdOutlineDisplaySettings className="mr-2" />
                <Link href="/">SETTINGS</Link>
              </li>
              <li className="flex justify-start items-center hover:bg-cyan-500 hover:text-red-500 rounded-xl p-1">
                <MdLightbulbOutline className="mr-2" />
                <Link href="/">ABOUT</Link>
              </li>
            </ul>
          </aside>
          <main className="flex-1">{children}</main>
        </div>
    </div>
    );
  };

  export default MainLayout;
