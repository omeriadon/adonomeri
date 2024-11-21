import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Bio Section */}
          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">About Me</h3>
            <p className="text-gray-400">
              Passionate developer crafting digital experiences. Always learning, always building.
            </p>
          </div>

          {/* Quick Links */}
          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/projects" className="hover:text-blue-400 transition">Projects</Link></li>
              <li><a href="#skills" className="hover:text-blue-400 transition">Skills</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
              <li><a href="/resume" className="hover:text-blue-400 transition">Resume</a></li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Let's Connect</h3>
            <div className="space-y-4">
              <a href="https://github.com/omeriadon" 
                 className="flex items-center hover:text-blue-400 transition group">
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href="mailto:omeriadon@outlook.com" 
                 className="flex items-center hover:text-blue-400 transition group">
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Email Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 