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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog-posts');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className={`min-h-screen pt-32 px-8 max-w-6xl mx-auto relative overflow-hidden ${montserrat.className}`}>
      <BackgroundIcons />
      <div className="relative z-10">
        <PageTitle 
          title="Blog"
          description="Thoughts, tutorials, and insights about programming and technology."
          icon="bi bi-journal-text"
        />
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
            <p className="mt-2">Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-400">
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.length > 0 ? (
              posts.map((post) => (
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
              ))
            ) : (
              <p className="text-center py-10">No blog posts found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}