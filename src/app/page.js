export default function Home() {
  return (
    <main className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-red-500 to-white">
      <img 
        src="/emslogo.png" 
        alt="Error Loading The Logo" 
        className="absolute top-4 left-4 w-25 h-20"
      />
        <div className="w-100   h-35 flex justify-center items-center">
        <span className="text-sml font-bold text-center text-black">
        Elecsys Manufacturing Corporation - Inventory Management System
        </span>
        </div>
    </main>
  );
}
