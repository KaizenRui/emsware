import Image from "next/image";
import Link from "next/link";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: "500",
});

const MainHeader = () => {
  return (
    <div className="fixed top-0 left-0 z-10 flex items-center h-[50px] w-screen border-[2px] border-[#5B6270] bg-[#6B7280]">
      <div className="flex items-center">
        <Link href="/dashboard">
          <Image
            src="/EMSWARE.png"
            alt="Logo"
            width={150}
            height={50}
            className="object-contain ml-14"
          />
        </Link>
      </div>
      <div className={`flex-1 text-center text-xl font-bold text-black ${orbitron.className}`}>
        THE FUTURE OF MODERN INVENTORY MANAGEMENT SYSTEM IS HERE
      </div>
    </div>
  );
};


export default MainHeader;
