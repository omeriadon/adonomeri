"use client";

import { memo } from 'react';
import { Montserrat } from 'next/font/google';

interface PageTitleProps {
  title: string;
  description: React.ReactNode;
  icon?: string;
}

// Initialize the font
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['700'],
});

const PageTitle = memo(function PageTitle({ title, description, icon }: PageTitleProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-center gap-4 mb-8">
        {icon && <i className={`${icon} text-4xl text-primary mr-2`}></i>}
        <h1 className={`text-5xl font-bold text-center gradient-text py-2 ${montserrat.variable}`}>
          {title}
        </h1>
      </div>
      <p className="text-gray-400 text-center max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
});

export default PageTitle;