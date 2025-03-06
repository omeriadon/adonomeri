"use client";

import { useEffect, useState } from 'react';
import { skillsData, additionalSkills, sectionTitles } from '../data/skills';
import PageTitle from "../components/PageTitle";
import BackgroundIcons from '../components/BackgroundIcons';
import { Montserrat } from 'next/font/google';

// Initialize Montserrat font
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

interface Skill {
  name: string;
  proficiency: string;
  experience: string;
  projects: string[];
}

interface SkillCategory {
  [key: string]: Skill[];
}

const SkillCard = ({ skill }: { skill: Skill }) => (
  <div className="

   backdrop-blur-sm rounded-xl p-8 border border-blue-400/20
           shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 
           hover:bg-blue-500/20 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]
  
  
  
  card-flex">
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-xl font-bold text-white font-family: var(--font-montserrat)">{skill.name}</h4>
      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
        {skill.proficiency}
      </span>
    </div>
    
    <p className="text-gray-300 mb-4">{skill.experience}</p>
    
    {skill.projects && (
      <div className="mt-auto">
        <h5 className="text-sm font-semibold text-gray-400 mb-2">PROJECTS</h5>
        <div className="flex flex-wrap gap-2">
          {skill.projects.map((project, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded"
            >
              {project}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const AdditionalCard = ({ item }: { item: { skill: string; proficiency: string } }) => (
  <div className=" card-flex card-hover my-8">
    <div className="flex items-center justify-between ">
      <h4 className="text-xl font-bold text-white font-family: var(--font-montserrat) ">{item.skill}</h4>
      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm card-hover">
        {item.proficiency}
      </span>
    </div>
  </div>
);

const LanguagesList = ({ languages }: { languages: string[] }) => (
  <div className="card-flex 
  
  
     backdrop-blur-sm rounded-xl p-8 border border-blue-400/20
           shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 
           hover:bg-blue-500/20 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]npm run dev
  
  my-8">
    <h4 className="text-xl font-bold text-white font-family: var(--font-montserrat) mb-4">Other Programming Languages</h4>
    <div className="flex flex-wrap gap-3">
      {languages.map((language, index) => (
        <span 
          key={index} 
          className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm"
        >
          {language}
        </span>
      ))}
    </div>
  </div>
);

const renderSkillSection = (title: string, skills: Skill[]) => (
  <div>
    <h3 className="text-2xl font-bold mb-6 text-blue-400 font-montserrat">{title}</h3>
    <div className="grid grid-cols-1 grid-cols-2 gap-6 ">
      {skills.map((skill, index) => (
        <SkillCard key={index} skill={skill} />
      ))}
    </div>
  </div>
);

export default function Skills() {
  return (
    <div className={`min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden ${montserrat.variable}`}>
      <BackgroundIcons />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <PageTitle 
            title="Skills & Expertise"
            description="A showcase of my technical experience and capabilities across different domains."
            icon="bi bi-tools"
          />
          
          {/* Development Section */}
          <div 
            key="section-development"
            className="mb-24 p-6 rounded-3xl card"
          >
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text font-montserrat">
              {sectionTitles.development}
            </h2>

            <div className="space-y-16">
              {Object.entries(skillsData.development).map(([categoryKey, skills], categoryIndex) => (
                <div key={`category-${categoryKey}`}>
                  {renderSkillSection(
                    categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
                    skills as Skill[]
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Tools Section */}
          <div 
            key="section-tools"
            className="mb-24 p-6 rounded-3xl card"
          >
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text font-montserrat">
              {sectionTitles.tools}
            </h2>

            <div className="space-y-16">
              {Object.entries(skillsData.tools).map(([categoryKey, skills], categoryIndex) => (
                <div key={`category-${categoryKey}`}>
                  {renderSkillSection(
                    categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
                    skills as Skill[]
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Other Programming Languages Section */}
          <div className="mb-24 p-6 rounded-3xl card">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text font-montserrat">
              Other Programming Languages
            </h2>
            
            {additionalSkills.otherLanguages && (
              <LanguagesList languages={additionalSkills.otherLanguages} />
            )}
          </div>
          
          {/* Additional Skills Section */}
          <div className="mb-24 p-6 rounded-3xl card">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text font-montserrat">
              {sectionTitles.additional}
            </h2>
            
            <div className="grid gap-16">
              {/* Render languages section */}
              {additionalSkills.languages && (
                <div key="additional-languages">
                  <h3 className="text-2xl font-bold mb-6 text-blue-400 font-montserrat">
                    Languages
                  </h3>
                  <div className="card-grid">
                    {additionalSkills.languages.map((item, itemIndex) => (
                      <AdditionalCard key={itemIndex} item={item} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Render any remaining sections */}
              {Object.entries(additionalSkills).map(([category, items], index) => {
                if (category !== 'languages' && category !== 'otherLanguages') {
                  return (
                    <div key={`additional-${category}`}>
                      <h3 className="text-2xl font-bold mb-6 text-blue-400 font-montserrat">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </h3>
                      <div className="card-grid">
                        {Array.isArray(items) && typeof items[0] === 'object' && 'skill' in items[0] &&
                          items.map((item, itemIndex) => (
                            <AdditionalCard key={itemIndex} item={item as { skill: string; proficiency: string }} />
                          ))
                        }
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}