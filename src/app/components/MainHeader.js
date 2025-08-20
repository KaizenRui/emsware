import Image from "next/image";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
    subsets: ["latin"],
    weight: "500",
});

const MainHeader = () => {
    return (
        <div className="flex h-[30px] w-screen border bg-white">
            <div className="flex items-center px-4">
                <Image
                    src="/EMSWARE.png"
                    alt="Logo"
                    width={100}
                    height={40}
                    className="object-contain"
                />
            </div>
            <div
                className={`flex-1 flex items-center justify-center bg-white text-xl font-bold text-header text-black ${orbitron.className}`}
            >
                TESTHEADER
            </div>
        </div>
    );
};

export default MainHeader;
