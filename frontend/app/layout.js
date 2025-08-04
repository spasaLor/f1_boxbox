import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";
import { cookies } from "next/headers";

const tiktok = Open_Sans({
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={tiktok.className}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
