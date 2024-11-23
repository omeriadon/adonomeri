import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/markdownStyles.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Adon Omeri",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8 pb-20">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  );
}
