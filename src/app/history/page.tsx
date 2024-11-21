"use client";

import React, { useEffect, useRef, useState } from 'react';

const timelineData = [
  {
    year: "2016-2020",
    title: "High School",
    institution: "Example High School",
    description: "Studied A-levels in Mathematics, Physics, and Computer Science.",
    achievements: [
      "Head of Computer Science Club",
      "Developed first web application",
    ]
  },
  {
    year: "2020-2023",
    title: "University",
    institution: "Example University",
    description: "BSc in Computer Science",
    achievements: [
      "First Class Honours",
      "Led team projects in web development",
      "Created multiple full-stack applications"
    ]
  },
];

export default function History() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const updateLineHeight = () => {
      if (timelineRef.current) {
        const timelineHeight = timelineRef.current.getBoundingClientRect().height;
        setLineHeight(timelineHeight + 100); // Add some padding at the bottom
      }
    };

    // Initial measurement
    updateLineHeight();

    // Update on window resize
    window.addEventListener('resize', updateLineHeight);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateLineHeight);
  }, []);

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto">
      <div className="max-w-7xl mx-auto relative">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          My Journey
        </h1>
        
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Explore my educational background and professional development milestones.
        </p>

        <div 
          className="absolute left-1/2 top-80 -translate-x-1/2" 
          style={{ height: `${lineHeight}px` }}
        >
          <svg
            className="h-full w-8 -translate-x-1/2"
            viewBox="0 0 10 100"
            preserveAspectRatio="none"
          >
            <path
              d="M5,0 Q7,25 3,50 Q-1,75 5,100"
              stroke="rgb(96, 165, 250)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div ref={timelineRef} className="relative space-y-32">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`relative flex ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              } items-center`}
            >
              <div className={`w-[calc(50%-3rem)] ${
                index % 2 === 0 ? 'mr-auto' : 'ml-auto'
              } bg-gray-900/50 backdrop-blur-[3px] border border-gray-800 rounded-xl p-12`}>
                <span className="text-blue-400 font-mono text-lg">{item.year}</span>
                <h3 className="text-2xl font-bold mt-4">{item.title}</h3>
                <p className="text-gray-400 mt-3 text-lg">{item.institution}</p>
                <p className="mt-8 text-lg">{item.description}</p>
                <ul className="mt-8 space-y-4">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center text-gray-300 text-lg">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 