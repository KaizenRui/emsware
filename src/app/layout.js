import "./globals.css";
import MainBody from "./components/MainBody";

export const metadata = {
  title: "EMSWARE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainBody>
          {children}
        </MainBody>
      </body>
    </html>
  );
}
