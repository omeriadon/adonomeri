"use client";

import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import BackgroundIcons from './components/BackgroundIcons';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="mt-6 text-gray-400">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
        Return Home
      </Link>
    </div>
  );
}