"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { marked } from 'marked';
import 'src/app/styles/markdownStyles.css';

export default function BlogPost() {
  const [isVisible, setIsVisible] = useState(false);
  const params = useParams();
  const [post, setPost] = useState<{
    title: string;
    date: string;
    tags: string[];
    content: string;
  } | null>(null);

  useEffect(() => {
    setIsVisible(true);
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.slug}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error loading blog post:', error);
      }
    };

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  if (!post) return null;

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto">
      <div className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <article className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-8 pt-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {post.title}
          </h1>
          
          <div className="flex justify-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-400 text-center mb-16">{post.date}</p>

          <div 
            className="markdown prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
} 