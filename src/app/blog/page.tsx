"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageTitle from "../components/PageTitle";
import { formatDate } from '@/utils/formatDate';
import BackgroundIcons from '../components/BackgroundIcons';
import { Montserrat as montserratFont } from 'next/font/google';

// Initialize the font
const montserrat = montserratFont({ subsets: ['latin'] });

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

// Mock data for now - replace with actual data fetching
const mockPosts: BlogPost[] = [
  {
    slug: 'first-blog-post',
    title: 'First Blog Post',
    date: '2024-03-22',
    tags: ['next.js', 'react', 'web-development']
  },
  // Add more mock posts as needed
];

export default function BlogPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);

  useEffect(() => {
    setIsVisible(true);
    // You can fetch posts here if needed
    // const fetchPosts = async () => {
    //   const response = await fetch('/api/posts');
    //   const data = await response.json();
    //   setPosts(data);
    // };
    // fetchPosts();
  }, []);

  return (
    <div className={`min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden ${montserrat.className}`}>
      <BackgroundIcons />
      <div className={`transition-all duration-1000 relative z-10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <PageTitle 
          title="Blog"
          description="Thoughts, tutorials, and insights about programming and technology."
          icon="bi bi-journal-text"
        />
        
        <div className="space-y-8">
          {posts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block"
            >
              <article className="card-hover">
                <h2 className={`text-2xl font-bold text-blue-400 mb-4 ${montserrat.className}`}>
                  {post.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm">
                    {formatDate(post.date)}
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}