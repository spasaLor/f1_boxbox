import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";

const tiktok = Open_Sans({
  subsets: ["latin"],
});

export const metadata={
  title:{
    template:"%s | F1BoxBox",
    default:"F1BoxBox"
  },
  description: "F1BoxBox — Your Formula 1 race diary · Add races to lists · Write and share reviews · Connect with people all around the world",
  applicationName: "F1 BoxBox",
  keywords: ['Formula 1', 'Races', 'Lists', 'Social Network', 'F1'],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  creator:"Lorenzo Spadaro"
}

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
