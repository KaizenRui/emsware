import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EMS Inventory Management",
  description: "Elecsys Manufacturing Corporation - Inventory Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col h-screen`}
      >
        {/* Top Navigation Bar */}
        <header className="h-14 bg-gray-800   text-white flex items-center px-4">
          <h1 className="font-bold text-lg">EMS Inventory System</h1>
        </header>

        <div className="flex flex-1">
          {/* Sidebar (Permanent) */}
          <aside className="w-1/5 bg-gray-200 p-4">
            <nav className="space-y-2">
              <a href="/" className="block hover:bg-gray-300 p-2 rounded">
                Home
              </a>
              <a href="/about" className="block hover:bg-gray-300 p-2 rounded">
                About
              </a>
              <a href="/contact" className="block hover:bg-gray-300 p-2 rounded">
                Contact
              </a>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>

        {/* Footer (Permanent) */}
        <footer className="h-10 bg-gray-800 text-white flex items-center justify-center text-sm">
          &copy; {new Date().getFullYear()} Elecsys Manufacturing Corporation
        </footer>
      </body>
    </html>
  );
}
