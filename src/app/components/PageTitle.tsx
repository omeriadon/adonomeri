"use client";

interface PageTitleProps {
  title: string;
  description: string;
  icon?: string;
}

export default function PageTitle({ title, description, icon }: PageTitleProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-center gap-4 mb-8">
        {icon && <i className={`${icon} text-4xl text-blue-400`+ ' mr-2'}></i>}
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent py-2">
          {title}
        </h1>
      </div>
      <p className="text-gray-400 text-center max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
} 