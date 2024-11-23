"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BackgroundIcons from './components/BackgroundIcons';
import { Montserrat as montserratFont } from 'next/font/google';  // Import directly from next/font/google

// Initialize the font
const montserrat = montserratFont({ subsets: ['latin'] });

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const links = [
    { 
      href: "/projects", 
      title: "Projects", 
      desc: "Explore my latest work and side projects",
      icon: "bi-code-square"
    },
    { 
      href: "/blog", 
      title: "Blog", 
      desc: "Technical articles and development insights",
      icon: "bi-journal-text"
    },
    { 
      href: "/skills", 
      title: "Skills", 
      desc: "Technologies and tools I work with",
      icon: "bi-tools"
    }
  ];

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden">
      <BackgroundIcons />
      <div className={`transition-all duration-1000 relative z-10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className={`space-y-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent ${montserrat.className}`}>
              Hello! I'm Adon Omeri
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Full-stack developer passionate about creating elegant solutions and meaningful digital experiences.
            </p>
          </div>
          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {links.map((link, index) => (
              <Link 
                href={link.href} 
                key={index}
                className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-400/20
                           shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 
                           hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
              >
                <i className={`${link.icon} text-blue-400 text-3xl mb-6 block`}></i>
                <h2 className={`text-2xl font-bold text-blue-400 mb-4 ${montserrat.className}`}>
                  {link.title}
                </h2>
                <p className="text-gray-300 text-3xl">
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}