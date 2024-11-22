"use client";

import React from 'react';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Bio Section */}
          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800
                        shadow-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">About Me</h3>
            <p className="text-gray-400">
              Passionate developer crafting digital experiences. Always learning, always building.
            </p>
          </div>

          {/* Quick Links */}
          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800
                        shadow-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/journey" 
                  className="px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200 -ml-3"
                >
                  <i className="bi bi-clock-history mr-2"></i>
                  Journey
                </Link>
              </li>
              <li>
                <Link 
                  href="/skills" 
                  className="px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200 -ml-3"
                >
                  <i className="bi bi-tools mr-2"></i>
                  Skills
                </Link>
              </li>
              <li>
                <Link 
                  href="/projects" 
                  className="px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200 -ml-3"
                >
                  <i className="bi bi-code-square mr-2"></i>
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200 -ml-3"
                >
                  <i className="bi bi-journal-text mr-2"></i>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800
                        shadow-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Connect</h3>
            <ul className="space-y-2">
              <li>
              

                <Link 
                  href="https://github.com/omeriadon" 
                  className="px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200 -ml-3"
                >
                  <i className="bi bi-github mr-2"></i>
                  Github
                </Link>
              </li>
              <li>

                <Link 
                
                  href="mailto:omeriadon@outlook.com" 
                  className="px-3 py-2 rounded-lg hover:bg-gray-800/50 hover:text-blue-400 transition-all duration-200 -ml-3"
                >
                  <i className="bi bi-envelope mr-2"></i>
                  Email
                </Link>
              </li>

            </ul>
          </div>





          





        </div>
      </div>
    </footer>
  );
} 