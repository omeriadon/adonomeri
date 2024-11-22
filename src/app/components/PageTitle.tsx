"use client";

interface PageTitleProps {
  title: string;
  description: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="mb-16">
      <h1 className="text-5xl font-bold text-center mb-8 pt-6 pb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-gray-400 text-center max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
} 