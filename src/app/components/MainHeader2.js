import Image from "next/image";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
    subsets: ["latin"],
    weight: "400", // you can change to "700" etc.
});

const MainHeader2 = () => {
    return (
        <div className="flex h-[20px] w-screen border">
            <div className="relative w-[7.5%] bg-gray-200">
                <Image
                    src="/EMSWARE.png"
                    alt="Logo"
                    fill
                    className="object-fill"
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

export default MainHeader2;
