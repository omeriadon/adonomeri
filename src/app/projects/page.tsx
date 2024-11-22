"use client";

import { useEffect, useState } from 'react';
import PageTitle from "../components/PageTitle";
import BackgroundIcons from '../components/BackgroundIcons';

const projectsData = [
  {
    title: "Portfolio Website",
    description: "This website is a portfolio of my projects and skills.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://adonomeri.vercel.app"
  },
  {
    title: "Add apple app here",
    description: "A collaborative task management tool with real-time updates",
    technologies: ["React", "Firebase", "Material UI", "Redux"],
    link: ""
  },
];

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden">
      <BackgroundIcons />
      <div className={`transition-all duration-1000 relative z-10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto">
        <PageTitle 
          title="My Projects"
          description="Here are some of the projects I've worked on. Each project represents a unique challenge and learning experience."
          icon="bi bi-code-square"
/>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projectsData.map((project, index) => {
              const CardContent = () => (
                <>
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">{project.title}</h3>
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              );

              const cardClassName = "block bg-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-400/20 " +
                                  "shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 hover:scale-105 " +
                                  "hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]";

              return project.link ? (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClassName}
                >
                  <CardContent />
                </a>
              ) : (
                <div key={index} className={cardClassName}>
                  <CardContent />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 