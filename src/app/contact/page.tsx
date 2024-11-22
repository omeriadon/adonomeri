"use client";

import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PageTitle from '../components/PageTitle';

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
          <PageTitle 
            title="Contact Me"
            description="Get in touch with me through any of these platforms."
          />
          
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            I&apos;m always open to new opportunities and conversations.
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
    </div>
  );
}