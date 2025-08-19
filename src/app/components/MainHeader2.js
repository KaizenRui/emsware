import Image from "next/image";
import { Orbitron } from 'next/font/google';

const MainHeader2 = () => {
    return (
        <div className="flex h-[50px] w-screen border">
            <div className="relative w-[7.5%] bg-gray-200">
                <Image
                    src="/EMSWARE.png"
                    alt="Logo"
                    fill
                    className="object-fill"
                />
            </div>
            <div className="flex-1 flex items-center justify-center bg-white text-xl font-bold text-black font-orbitron">
                ORBITRON TEXT
            </div>

        </div>
    );
};

export default MainHeader2;
