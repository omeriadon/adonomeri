"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: "bi bi-house" },
    { href: "/projects", label: "Projects", icon: "bi bi-code-square" },
    { href: "/skills", label: "Skills", icon: "bi bi-tools" },
    { href: "/journey", label: "Journey", icon: "bi bi-clock-history" },
    { href: "/blog", label: "Blog", icon: "bi bi-journal-text" },
    { href: "/contact", label: "Contact", icon: "bi bi-envelope" }
  ];

  return (
    <nav className="fixed w-full bg-gray-900/60 backdrop-blur-md border-b border-gray-700/50 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-blue-400 hover:scale-105 transition-transform duration-200 px-3 py-2 rounded-lg hover:bg-blue-500/20">
            Adon Omeri
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-105 ${
                  pathname === link.href
                    ? 'text-blue-400 bg-blue-500/20'
                    : 'text-gray-200 hover:text-blue-400 hover:bg-blue-500/10'
                }`}
              >
                <i className={link.icon}></i>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - lighter background on hover */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-500/20 transition-colors duration-200"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-blue-400 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-blue-400 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-blue-400 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Panel - lighter background */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-[400px] opacity-100' 
            : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-2 px-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-105 ${
                  pathname === link.href
                    ? 'text-blue-400 bg-blue-500/20'
                    : 'text-gray-200 hover:text-blue-400 hover:bg-blue-500/10'
                }`}
              >
                <i className={link.icon}></i>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}