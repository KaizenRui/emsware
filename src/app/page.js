export default function Home() {
  return (
    <div className="relative flex justify-center items-center min-h-[calc(100vh-56px-40px)] bg-gradient-to-r from-red-500 to-white rounded-lg shadow">
      <img
        src="/emslogo.png"
        alt="Error Loading The Logo"
        className="absolute top-4 left-4 w-24 h-20"
      />
      <div className="w-full h-36 flex justify-center items-center">
        <span className="text-sm font-bold text-center text-black">
          Elecsys Manufacturing Corporation - Inventory Management System
        </span>
      </div>
    </div>
  );
}
