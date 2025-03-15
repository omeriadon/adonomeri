"use client";
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Montserrat as montserratFont } from 'next/font/google';

// Initialize the font
const montserrat = montserratFont({ 
  subsets: ['latin'],
  display: 'swap' // Add this to improve font loading performance
});

// Dynamically import heavy components with proper loading state
const BackgroundIcons = dynamic<{}>(
  () => import('./components/BackgroundIcons').then(mod => {
    // Small delay to ensure other critical content loads first
    return new Promise<React.ComponentType<{}>>(resolve => setTimeout(() => resolve(mod.default), 100))
  }), {
  ssr: false,
  loading: () => null // Remove animate-pulse to reduce render work
});

// Memoize calculation function
const calculateAge = (birthdate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
};

export default function Home() {
  // Use useMemo for birthdate
  const birthdate = useMemo(() => new Date('2010-04-06'), []);
  
  // Create a date key that changes only once per day to minimize recalculations
  const dateKey = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  }, []);
  
  // Calculate age with useMemo - will only recalculate when the date changes
  const age = useMemo(() => calculateAge(birthdate), [birthdate, dateKey]);

  // Memoize links to prevent re-creation on each render
  const links = useMemo(() => [
    { 
      href: "/", 
      title: "Coding", 
      desc: "Exploring the art of programming and software development, creating ",
      icon: "bi-code-square"
    },
    { 
      href: "/", 
      title: "Technology", 
      desc: "Learning about Apple, Microsoft, and others. Exploring hardware and software technology.",
      icon: "bi-apple"
    },
    { 
      href: "/", 
      title: "Networking", 
      desc: "Understanding computer networks, protocols, infrastructure design and more",
      icon: "bi-router"
    }
  ], []);

  return (
    // Remove duplicated div - this was causing unnecessary layout work
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Hero Section - Add priority rendering */}
          <div className="space-y-8">
            <h1 className={`text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent ${montserrat.className}`}>
              Hello! I'm Adon Omeri
            </h1>
            {/* Add height reservation to prevent layout shift */}
            <p className="text-xl md:text-2xl text-gray-400 min-h-[3rem]">
              A {age} year old full-stack developer and tech lover passionate about creating elegant solutions and meaningful digital experiences.
            </p>
          </div>
          
          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {links.map((link, index) => (
              <Link 
                href={link.href} 
                key={index}
                className="card-hover"
              >
                <i className={`${link.icon} text-blue-400 text-3xl mb-6 block`}></i>
                <h2 className={`text-2xl font-bold text-blue-400 mb-4 ${montserrat.className}`}>
                  {link.title}
                </h2>
                <p className="text-gray-300 text-2xl">
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Load background icons after main content */}
      <Suspense fallback={null}>
        <BackgroundIcons />
      </Suspense>
    </div>
  );
}
