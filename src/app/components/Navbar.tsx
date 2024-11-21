"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <nav className="p-4 bg-gray-900/90 shadow-xl rounded-xl border border-gray-800 backdrop-blur-[4px] mx-4 my-2">
        <div className="container mx-auto flex justify-between items-center px-0">
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            Adon Omeri
          </Link>
          
          <div className="hidden md:flex space-x-2">
            <Link href="/about" className="px-3 py-2 text-gray-300 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-all">
              History
            </Link>
            <Link href="/contact" className="px-3 py-2 text-gray-300 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-all">
              Contact
            </Link>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white transition-transform duration-200 ease-in-out"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen 
                  ? "M6 18L18 6M6 6l12 12" 
                  : "M4 6h16M4 12h16M4 18h16"
                } 
              />
            </svg>
          </button>
        </div>
        
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/90 rounded-lg border border-gray-800">
            <Link href="/about" className="block px-3 py-2 text-gray-300 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-all">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-300 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-all">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}