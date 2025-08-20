import "./globals.css";
import MainLayout from "./components/MainLayout";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // choose available weights
});

export const metadata = {
  title: "EMSWARE",
  description: "COMING SOON!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
