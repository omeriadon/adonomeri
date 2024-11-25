"use client";

import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/markdownStyles.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Montserrat } from 'next/font/google';
import { useState, useEffect } from 'react';



const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

// export const metadata: Metadata = {
//   title: "Adon Omeri",
//   description: "Adon Omeri's Portfolio",
// };





export default function RootLayout({
  children,
}: { 
  children: React.ReactNode
}) {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <html lang="en" className="dark className={`transition-all duration-1000 relative z-10 ${
  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
}`}">
      <body className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8 ">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  );
}
