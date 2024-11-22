"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

import PageTitle from "../components/PageTitle";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "first-post",
    title: "My First Blog Post",
    date: "2024-03-20",
    tags: ["programming", "web-development"],
    excerpt: "This is my first blog post about web development..."
  },
  // Add more posts here
];

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 max-w-6xl mx-auto">
      <div className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto">
        <PageTitle 
  title="Blog"
  description="Thoughts, tutorials, and insights about programming and technology."
/>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-400/20
                         shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300 hover:scale-105
                         hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
              >
                <h2 className="text-2xl font-bold text-blue-400 mb-2">{post.title}</h2>
                <div className="flex gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400 text-sm mb-4">{post.date}</p>
                <p className="text-gray-300">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 