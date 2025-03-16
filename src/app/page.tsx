"use client";
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Montserrat as montserratFont } from 'next/font/google';

// Initialize the font
const montserrat = montserratFont({
  subsets: ['latin'],
  display: 'swap',
});

// Dynamically import the new animation component
const TechParticlesAnimation = dynamic(
  () => import('./components/TechParticlesAnimation'),
  {
    ssr: false,
    loading: () => null,
  }
);

// Memoize calculation function
const calculateAge = (birthdate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
};

// Define link type
interface LinkItem {
  href: string;
  title: string;
  desc: string;
  icon: string;
}

export default function Home() {
  const birthdate = useMemo(() => new Date('2010-04-06'), []);
  const dateKey = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  }, []);

  const age = useMemo(() => calculateAge(birthdate), [birthdate]);

  const links = useMemo<LinkItem[]>(() => [
    {
      href: '/',
      title: 'Coding',
      desc: 'Exploring the art of programming and software development, creating',
      icon: 'bi-code-square',
    },
    {
      href: '/',
      title: 'Technology',
      desc: 'Learning about Apple, Microsoft, and others. Exploring hardware and software technology.',
      icon: 'bi-apple',
    },
    {
      href: '/',
      title: 'Networking',
      desc: 'Understanding computer networks, protocols, infrastructure design and more',
      icon: 'bi-router',
    },
  ], []);

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden">
      {/* Replace BackgroundIcons with TechParticlesAnimation */}
      <Suspense fallback={null}>
        <TechParticlesAnimation />
      </Suspense>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-8">
            <h1
              className={`text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent ${montserrat.className}`}
            >
              Hello! I'm Adon Omeri
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 min-h-[3rem]">
              A {age} year old full-stack developer and tech lover passionate about creating elegant solutions and meaningful digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {links.map((link, index) => (
              <Link href={link.href} key={index} className="card-hover">
                <i className={`${link.icon} text-blue-400 text-3xl mb-6 block`}></i>
                <h2 className={`text-2xl font-bold text-blue-400 mb-4 ${montserrat.className}`}>
                  {link.title}
                </h2>
                <p className="text-gray-300 text-2xl">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}