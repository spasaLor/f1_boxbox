import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";
import { cookies } from "next/headers";

const tiktok = Open_Sans({
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const userCookie= cookieStore.get('username');
  let username="";
  if(userCookie)
    username=userCookie.value;

  return (
    <html lang="en">
      <body className={tiktok.className}>
        <Navbar username={username}/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
