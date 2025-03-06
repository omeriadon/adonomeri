import "./styles/globals.css";
import "./styles/markdownStyles.css";
import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PageTransition from "src/app/components/PageTransition";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap', // This is already correct
  preload: true,
  variable: '--font-montserrat',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: "Adon Omeri",
  description: "Portfolio website for Adon Omeri",
};

export default function RootLayout({
  children,
}: { 
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${montserrat.className}`}>
      <body className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <PageTransition>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </PageTransition>
        
        <Footer />

        
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
