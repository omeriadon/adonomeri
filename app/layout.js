import { Montserrat } from 'next/font/google';
// Import your actual components from their correct locations
import Navbar from '../src/app/components/Navbar';
import Footer from '../src/app/components/Footer'; 
import PageTransition from '../src/app/components/PageTransition';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import StylesheetLoader from '../src/app/components/StylesheetLoader';

// Optimize font loading with display: swap
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap', // This prevents render blocking while font loads
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Adon Omeri | Portfolio',
  description: 'Personal portfolio and website showcasing projects, skills, and professional experience.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={`dark select-none ${montserrat.className}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Bootstrap icons loaded via client component */}
        <StylesheetLoader href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css" />
        
        <meta name="google-site-verification" content="ZQc5lUuhUy6f3lNRpn6l6JwLt63FsttMZGe3swZBLT8" />
      </head>
      <body className="min-h-screen bg-gray-900 text-gray-100">
        <nav className="fixed w-full bg-gray-900/60 backdrop-blur-md border-b border-gray-800 z-50">
          <Navbar />
        </nav>
        <main className="container mx-auto px-4 py-8">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
          <Footer />
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
