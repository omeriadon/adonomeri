"use client";
import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PageTitle from '../components/PageTitle';
import BackgroundIcons from '../components/BackgroundIcons';
import { Montserrat } from 'next/font/google';

// Initialize Montserrat font
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat', // Add this for proper font variable usage
});

const contactMethods = [
  {
    title: "Email",
    description: "Drop me a message anytime. I typically respond within 24 hours.",
    link: "mailto:omeriadon@outlook.com",
    icon: "bi-envelope-fill"
  },
  {
    title: "GitHub",
    description: "Check out my code repositories and contributions.",
    link: "https://github.com/omeriadon",
    icon: "bi-github"
  },
  // {
  //   title: "X",
  //   description: "Follow me for tech insights and development updates.",
  //   link: "https://x.com/AdonOmeri",
  //   icon: "bi-twitter-x"
  // },
];


export default function Contact() {
 

  return (
    <div className={`min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden ${montserrat.variable}`}>
      <BackgroundIcons />
      <div className={` relative z-10 '
      }`}>
        <PageTitle 
          title="Contact"
          description={(
            <>
              <span className="block mb-2">Get in touch with me through any of these platforms.</span>
              <span className="block">I'm always open to new opportunities and conversations.</span>
            </>
          )}
          icon="bi bi-envelope"
        />

        <div className="max-w-2xl mx-auto space-y-6">
          {contactMethods.map((method, index) => (
            method.link ? (
              <a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover block"
              >
                <div className="flex items-center">
                  <i className={`${method.icon} text-blue-400 text-3xl mr-6`}></i>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-3 font-montserrat">
                      {method.title}
                    </h3>
                    <p className="text-gray-300">{method.description}</p>
                  </div>
                </div>
              </a>
            ) : (
              <div
                key={index}
                className="card-hover block"
              >
                <div className="flex items-center">
                  <i className={`${method.icon} text-blue-400 text-3xl mr-6`}></i>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-3 font-montserrat">
                      {method.title}
                    </h3>
                    <p className="text-gray-300">{method.description}</p>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}