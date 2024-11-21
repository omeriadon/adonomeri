"use client";

import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const contactMethods = [
  {
    title: "Email",
    description: "Drop me a message anytime. I typically respond within 24 hours.",
    link: "mailto:adon.omeri@gmail.com",
    icon: "bi-envelope-fill"
  },
  {
    title: "GitHub",
    description: "Check out my code repositories and contributions.",
    link: "https://github.com/adonomeri",
    icon: "bi-github"
  },
  {
    title: "X",
    description: "Follow me for tech insights and development updates.",
    link: "https://x.com/AdonOmeri",
    icon: "bi-twitter-x"
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Let's Connect
        </h1>
        
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Choose your preferred way to get in touch. I'm always open to new opportunities and conversations.
        </p>

        <div className="max-w-2xl mx-auto space-y-6">
          {contactMethods.map((method, index) => (
            method.link ? (
              <a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-400/20
                         shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 hover:scale-[1.02]
                         hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
              >
                <div className="flex items-center">
                  <i className={`${method.icon} text-blue-400 text-3xl mr-6`}></i>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">{method.title}</h3>
                    <p className="text-gray-300">{method.description}</p>
                  </div>
                </div>
              </a>
            ) : (
              <div
                key={index}
                className="block bg-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-400/20
                         shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                <div className="flex items-center">
                  <i className={`${method.icon} text-blue-400 text-3xl mr-6`}></i>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-2">{method.title}</h3>
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