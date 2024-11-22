"use client";

import { useEffect, useState } from 'react';
import { skillsData, additionalSkills, sectionTitles } from '../data/skills';
import PageTitle from "../components/PageTitle";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface CategorySection {
  [key: string]: SkillCategory[];
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const renderSkillSection = (title: string, skills: SkillCategory[], keyPrefix: string) => (
    <div key={`section-${keyPrefix}`} className="mb-16">
      <h3 className="text-2xl font-bold mb-8 text-blue-400">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {skills.map((category, index) => (
          <div 
            key={`${keyPrefix}-${index}`}
            className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-400/20
                     shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 hover:scale-105
                     hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
          >
            <h4 className="text-xl font-bold text-blue-400 mb-6">{category.category}</h4>
            <div className="space-y-6">
              {category.skills.map((skill: Skill, skillIndex: number) => (
                <div key={`${keyPrefix}-${index}-${skillIndex}`}>
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
  );

  const renderCategory = (title: string, category: CategorySection, index: number) => (
    <div key={`category-${index}`} className="mb-24">
      <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        {title}
      </h2>
      {Object.entries(category).map(([key, value], sectionIndex) => 
        renderSkillSection(
          key.charAt(0).toUpperCase() + key.slice(1), 
          value as SkillCategory[],
          `${index}-${sectionIndex}`
        )
      )}
    </div>
  );

  const renderAdditionalSection = () => (
    <div className="mb-24">
      <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        {sectionTitles.additional}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Languages */}
        <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-400/20
                     shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 hover:scale-105
                     hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]">
          <h3 className="text-2xl font-bold text-blue-400 mb-6">Languages</h3>
          <div className="space-y-4">
            {additionalSkills.languages.map((lang, index) => (
              <div key={index} className="border-b border-blue-400/20 last:border-0 pb-4 last:pb-0">
                <h4 className="text-lg font-semibold text-gray-300">{lang.language}</h4>
                <p className="text-gray-400">{lang.proficiency}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investments */}
        <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-400/20
                     shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 hover:scale-105
                     hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]">
          <h3 className="text-2xl font-bold text-blue-400 mb-6">Investments</h3>
          <div className="space-y-4">
            {additionalSkills.investments.map((inv, index) => (
              <div key={index} className="border-b border-blue-400/20 last:border-0 pb-4 last:pb-0">
                <h4 className="text-lg font-semibold text-gray-300">{inv.investment}</h4>
                <p className="text-gray-400">{inv.proficiency}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto">
      <div className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto">
          <PageTitle 
            title="Skills & Expertise"
            description="A comprehensive overview of my technical skills and proficiency levels across different domains."
/>

          {Object.entries(skillsData).map(([key, value], index) => 
            renderCategory(sectionTitles[key as keyof typeof sectionTitles], value, index)
          )}
          {renderAdditionalSection()}
        </div>
      </div>
    </div>
  );
} 