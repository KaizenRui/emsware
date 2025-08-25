import "./globals.css";
import { Orbitron } from "next/font/google";

export const metadata = {
  title: "EMSWARE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children} {}
      </body>
    </html>
  );
}
