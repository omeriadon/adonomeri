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
    year: "2015-2021",
    title: "Library Monitor",
    institution: "Rostrata Primary School",
    description: "Completed primary school education, and volunteered as a library assistant.",
    achievements: [
      "Participated in various school events",
      "Developed a passion for technology",
    ]
    },
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
  {
    year: "2025",
    title: "Networking",
    institution: "Cisco Networking Academy",
    description: "Studied various networking, cybersecurity, data science, and other concepts.",
    achievements: [
      "Finished Cisco Networking Academy's Network Technician course",
      // "Completed TAFE's Certificate IV in Networking",
    ]
  },
  // You might want to add more timeline items here
];

export default function History() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const updateLineHeight = () => {
      if (timelineRef.current) {
        const timelineHeight = timelineRef.current.getBoundingClientRect().height;
        setLineHeight(timelineHeight + 100);
      }
    };

    updateLineHeight();
    window.addEventListener('resize', updateLineHeight);
    return () => window.removeEventListener('resize', updateLineHeight);
  }, []);

  return (
    <div className={`min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden pb-8 ${montserrat.variable}`}>
      <BackgroundIcons />
      <div className="transition-all duration-1000 relative z-10">
        <div className="max-w-7xl mx-auto relative">
          <PageTitle 
            title="My Journey"
            description="Explore my educational background and professional development milestones."
            icon="bi bi-clock-history"
          />
          

          
          {/* Desktop vertical line (center aligned) */}
          <div 
            className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-16 w-1 bg-gray-700"
            style={{ height: `${lineHeight}px` }}
          >
          </div>

          <div ref={timelineRef} className="relative pt-8 px-4">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className="relative"
                style={{
                  marginTop: index > 0 ? '50px' : '0',
                }}
              >
                {/* Mobile timeline dot (left aligned) */}
                <div className="md:hidden absolute left-8 -translate-x-1/2 h-8 w-8 ml-1 mt-8 rounded-full bg-blue-500  z-30"></div>
                
                {/* Desktop timeline dot (center aligned) */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-10 w-10 mt-8 rounded-full bg-blue-500  z-30"></div>
                
                <div className={`relative flex ${
                  index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                } justify-start items-center`}>
                  <div className={`
                  w-full pl-16 pr-4 md:w-[calc(50%-3rem)]
                  ${index % 2 === 0 ? 'md:mr-auto md:pr-8 md:pl-8' : 'md:ml-auto md:pl-8 md:pr-8'}
                  card-hover
                  `}>
                  <span className="text-blue-400 font-mono text-lg">{item.year}</span>
                  <h3 className="text-xl font-bold text-blue-400 mb-2 font-montserrat">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 mt-3 text-lg">{item.institution}</p>
                  <p className="mt-8 text-lg text-gray-300">{item.description}</p>
                  <ul className="mt-8 space-y-4">
                    {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center text-gray-300 text-lg">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                      <span className="flex-1">{achievement}</span>
                    </li>
                    ))}
                  </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}