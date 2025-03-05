"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BackgroundIcons from './components/BackgroundIcons';
import { Montserrat as montserratFont } from 'next/font/google';  // Import directly from next/font/google

// Initialize the font
const montserrat = montserratFont({ subsets: ['latin'] });

function calculateAge(birthdate: Date) {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
}

export default function Home() {
  const [age, setAge] = useState<number>(0);
  const birthdate = new Date('2010-04-06'); // Replace with your birthdate

  useEffect(() => {
    setAge(calculateAge(birthdate));
  }, []);

  const links = [
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
  ];

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden">
      <BackgroundIcons />

      <div className={` relative z-10 '
      }`}>
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className={`space-y-8 `}>
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent  ${montserrat.className}`}>
              Hello! I'm Adon Omeri
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
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
    </div>
  );
}