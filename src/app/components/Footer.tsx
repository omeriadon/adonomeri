"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Footer() {
  // Use useState and useEffect to handle year on client side only
  const [year, setYear] = useState('');
  
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="relative z-10 mt-16 border-t border-gray-800/40">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bio Section */}
          <div className="card-hover">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent mb-4">About Me</h3>
            <p className="text-gray-400">
              Passionate developer crafting digital experiences. Always learning, always building.
            </p>
          </div>

          {/* Quick Links */}
          <div className="card-hover">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/journey", icon: "bi-clock-history", label: "Journey" },
                { href: "/skills", icon: "bi-tools", label: "Skills" },
                { href: "/projects", icon: "bi-code-square", label: "Projects" },
                { href: "/blog", icon: "bi-journal-text", label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="flex items-center text-gray-400 hover:text-blue-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-900/15 hover:translate-x-1"
                  >
                    <i className={`bi ${link.icon} mr-2`}></i> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="card-hover">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent mb-4">Connect</h3>
            <ul className="space-y-2">
              {[
                { href: "https://github.com/omeriadon", icon: "bi-github", label: "Github" },
                { href: "mailto:omeriadon@outlook.com", icon: "bi-envelope", label: "Email" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="flex items-center text-gray-400 hover:text-blue-400 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-900/15 hover:translate-x-1"
                  >
                    <i className={`bi ${link.icon} mr-2`}></i> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-500 text-sm">
          {/* Use client-side state value instead of direct Date call */}
          <p>© {year} Adon Omeri | Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
