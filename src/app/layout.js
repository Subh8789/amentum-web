"use client";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { usePathname } from 'next/navigation';
import { PickupNav } from "@/components/PickupNav";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ['/'];

  // const showPickupNavRoutes = ['/pickup']

  return (
    <html lang="en" style={{"overflow": "auto"}}>
      <body>
        <Header />
        { !hideNavbarRoutes.includes(pathname) && <Navbar /> }
        {/* {showPickupNavRoutes.includes(pathname) && <PickupNav/>} */}
        {children}
        <Footer />
      </body>
    </html>
  );
}