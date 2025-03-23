import { Montserrat } from 'next/font/google';
import './styles/globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import StylesheetLoader from './components/StylesheetLoader';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Optimize font loading with display: swap
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap', // This prevents render blocking while font loads
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark select-none ${montserrat.className}`}>
      <head>
        {/* Viewport meta tag for proper scaling */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Bootstrap icons loaded via client component */}
        <StylesheetLoader href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css" />
        
        <meta name="google-site-verification" content="ZQc5lUuhUy6f3lNRpn6l6JwLt63FsttMZGe3swZBLT8" />
      </head>
      <body className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
        <Navbar />
        <PageTransition>
          <div className="w-screen max-w-none py-8 px-0 box-border relative" style={{ width: "100vw" }}>
            <div className="w-full scale-100 pb-32 mb-8">
              {children}
            </div>
          </div>
        </PageTransition>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
