"use client";

import React from 'react';

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
  // Add more timeline items as needed
];

export default function History() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto relative">
        <h1 className="text-4xl font-bold text-center mb-32">
          My Journey
        </h1>
        
        <div className="absolute left-1/2 top-48 bottom-20 -translate-x-1/2">
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

        <div className="relative space-y-32">
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
    </main>
  );
} 