"use client";

import { useEffect, useState, useRef } from 'react';

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 10 },
      { name: "TypeScript", level: 20 },
      { name: "Next.js", level: 10 },
      { name: "Tailwind CSS", level: 10 }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 5 },
      { name: "Python", level: 40 },
      { name: "Terminal zsh", level: 70 },
    ]
  },
  {
    category: "Mobile",
    skills: [
      { name: "Swift", level: 75 },
      { name: "SwiftUI", level: 70 },
    ]
  }
];

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto">
      <div className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h1>
          
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData.map((category, index) => (
              <div 
                key={index} 
                className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-400/20
                         shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 hover:scale-105
                         hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
              >
                <h2 className="text-2xl font-bold text-blue-400 mb-6">{category.category}</h2>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-blue-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div 
                          className="h-full bg-blue-400 rounded-full transition-all duration-1000"
                          style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 