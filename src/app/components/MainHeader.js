import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
  return (
    <div className="fixed top-0 left-0 z-10 flex items-center h-[50px] w-screen border-[2px] border-[#5B6270] bg-gray-200 px-4">

      <div className="flex items-center pl-12">
        <Link href="/dashboard">
          <span className="text-2xl font-bold cursor-pointer">
            <span className="text-blue-800">EMS</span>
            <span className="text-black">WARE</span>
          </span>
        </Link>
      </div>


      <div className="flex-1 text-center text-xl font-bold text-black">
        THE FUTURE OF MODERN INVENTORY MANAGEMENT SYSTEM IS HERE
      </div>
    </div>
  );
};

export default MainHeader;
