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

// Pages configuration array - matching exactly with Navbar.tsx
const pages = [

  {
    href: "/projects",
    title: "Projects",
    desc: "Explore my latest coding projects, applications, and development work.",
    icon: "bi bi-code-square",
  },
  {
    href: "/skills",
    title: "Skills",
    desc: "My technical expertise across programming languages, frameworks and tools.",
    icon: "bi bi-tools",
  },
  {
    href: "/journey",
    title: "Journey",
    desc: "Follow my path through technology, education, and professional growth.",
    icon: "bi bi-clock-history",
  },
  {
    href: "/blog",
    title: "Blog",
    desc: "Thoughts, tutorials and insights on programming, tech trends and innovations.",
    icon: "bi bi-journal-text",
  },
  {
    href: "/certifications",
    title: "Certifications",
    desc: "Professional qualifications and achievements in various tech domains.",
    icon: "bi bi-award",
  },
  {
    href: "/contact",
    title: "Contact",
    desc: "Get in touch for collaborations, questions, or just to say hello!",
    icon: "bi bi-envelope",
  }
];

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

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden">
      {/* Replace BackgroundIcons with TechParticlesAnimation */}
      <div className=" " >
      <Suspense fallback={null}  >
        <TechParticlesAnimation />
      </Suspense>
      </div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-8">
            <h1
              className={`text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-300 to-blue-900 bg-clip-text text-transparent ${montserrat.className}`}
            >
              Hello! I'm Adon Omeri
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 min-h-[3rem]">
              A {age} year old full-stack developer and tech lover exploring different parts of the technology field.
            </p>
          </div>
          
          {/* Grid for pages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-8">
            {pages.map((page, index) => (
              <Link href={page.href} key={index} className="card-hover r-blue-900/30 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <i className={`${page.icon} text-blue-400 text-2xl mr-3`}></i>
                  <h2 className={`text-xl font-bold text-blue-400 ${montserrat.className}`}>
                    {page.title}
                  </h2>
                </div>
                <p className="text-gray-300 text-sm">{page.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}