"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <style jsx>{`
        .nav-blur::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 120px;
          backdrop-filter: blur(30px);
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.8) 30%,
            rgba(0, 0, 0, 0.5) 60%,
            rgba(0, 0, 0, 0) 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.8) 30%,
            rgba(0, 0, 0, 0.5) 60%,
            rgba(0, 0, 0, 0) 100%
          );
          z-index: -1;
        }
      `}</style>
      
      <div className="nav-blur mt-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-900/80 border border-gray-800 rounded-xl">
            <div className="px-6">
              <div className="flex justify-between items-center h-16">
                {/* Logo/Home Link */}
                <Link href="/" className="text-xl font-bold mr-16">
                  Adon Omeri
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8">
                  <Link 
                    href="/history" 
                    className="px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200"
                  >
                    History
                  </Link>
                  <Link 
                    href="/projects" 
                    className="px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200"
                  >
                    Projects
                  </Link>
                  <Link 
                    href="/contact" 
                    className="px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200"
                  >
                    Contact
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-md focus:outline-none ml-4"
                >
                  <svg
                    className="h-6 w-6 transition-transform duration-200"
                    style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
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

              {/* Mobile Menu */}
              <div 
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="py-3 space-y-1">
                  <Link
                    href="/history"
                    className="block px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    History
                  </Link>
                  <Link
                    href="/projects"
                    className="block px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Projects
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}