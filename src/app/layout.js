"use client";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { usePathname } from 'next/navigation';
import { PickupNav } from "@/components/PickupNav";
import AuthProvider, { AutoLogout } from "@/components/AuthProvider";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ['/'];
  const hideNavbarRoute = ['/login']

  // const showPickupNavRoutes = ['/pickup']

  return (
    <html lang="en" style={{"overflow": "auto"}}>
       {/* <AuthProvider>
       <AutoLogout /> */}
      <body>
      <SessionProvider>
        <Header />
        { !hideNavbarRoutes.includes(pathname) || !hideNavbarRoute.includes(pathname)  && <Navbar /> }
        {/* {showPickupNavRoutes.includes(pathname) && <PickupNav/>} */}
      {children}
        <Footer />
        </SessionProvider>
      </body>
      {/* </AuthProvider> */}
    </html>
  );
}