"use client";
import { useEffect, useState } from 'react';
import PageTitle from "../components/PageTitle";
import BackgroundIcons from '../components/BackgroundIcons';
import { Montserrat } from 'next/font/google';

// Initialize Montserrat font
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const projectsData = [
  {
    title: "Portfolio Website",
    description: "This website is a portfolio of my projects and skills.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "/"
  },
  {
    title: "Apple Directory",
    description: "An in-progress Apple device catalogue",
    technologies: ["Swift", "SwiftUI"],
    link: ""
  },
  {
    title: "MultiClip",
    description: "A simple lightweight text snippet manager",
    technologies: ["Swift", "SwiftUI", "SwiftData"],
    link: "https://github.com/omeriadon/MultiClip"
  },
];

const CardContent = ({ project }: { project: typeof projectsData[0] }) => (
  <>
    <h3 className="text-2xl font-bold text-blue-400 mb-3 font-montserrat">
      {project.title}
    </h3>
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

export default function Projects() {
  
  


  const cardClassName = "card-hover block";

  return (
    <div className={`min-h-screen pt-32 px-8 max-w-6xl mx-auto relative overflow-hidden ${montserrat.variable}`}>
      <BackgroundIcons />
      <div className={`relative z-10 '
      }`}>
        <div className="max-w-7xl mx-auto">
          <PageTitle 
            title="My Projects"
            description="Here are some of the projects I've worked on. Each project represents a unique challenge and learning experience."
            icon="bi bi-code-square"
          />
          <div className="grid grid-cols-1 grid-cols-2 gap-10">
            {projectsData.map((project, index) => (
              project.link ? (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClassName}
                >
                  <CardContent project={project} />
                </a>
              ) : (
                <div key={index} className={cardClassName}>
                  <CardContent project={project} />
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}