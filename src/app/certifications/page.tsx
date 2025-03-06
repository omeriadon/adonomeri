"use client";

import { certifications } from '../data/certifications';
import CertificationCard from '../components/CertificationCard';
import PageTitle from "../components/PageTitle";
import BackgroundIcons from '../components/BackgroundIcons';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function Certifications() {
  return (
    <div className={`min-h-screen pt-32 px-8 max-w-6xl pb-8 mx-auto relative overflow-hidden ${montserrat.variable}`}>
      <BackgroundIcons />
      <div className="relative z-10">
        <PageTitle 
          title="Certifications"
          description="Professional certifications and achievements that showcase my expertise and continuous learning."
          icon="bi bi-award"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <CertificationCard
              key={cert.id}
              name={cert.name}
              provider={cert.provider}
              date={cert.date}
              image={cert.image}
              link={cert.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}