"use client";
import { useEffect, useState, useRef } from 'react';
import PageTitle from "../components/PageTitle";
import BackgroundIcons from '../components/BackgroundIcons';
import { Montserrat } from 'next/font/google';

// Initialize Montserrat font
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const timelineData = [
  {
    year: "2022-2027",
    title: "High School",
    institution: "Perth Modern School",
    description: "Learnt all the basics of programming and computer science.",
    achievements: [
      "Learnt Swift and SwiftUI",
      "Developed first website",
    ]
  },
];

export default function History() {
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
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
    <div className={`min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden ${montserrat.variable}`}>
      <BackgroundIcons />
      <div className={`transition-all duration-1000 relative z-10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto relative">
          <PageTitle 
            title="My Journey"
            description="Explore my educational background and professional development milestones."
            icon="bi bi-clock-history"
          />
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
                } card-hover`}>
                  <span className="text-blue-400 font-mono text-lg">{item.year}</span>
                  <h3 className="text-xl font-bold text-blue-400 mb-2 font-montserrat">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 mt-3 text-lg">{item.institution}</p>
                  <p className="mt-8 text-lg text-gray-300">{item.description}</p>
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
    </div>
  );
}