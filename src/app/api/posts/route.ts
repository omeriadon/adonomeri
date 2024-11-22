// app/api/blog/[slug]/route.ts
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  
  const postsDirectory = path.join(process.cwd(), 'public/content/blog');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const htmlContent = marked(content);
    
    return Response.json({
      title: data.title,
      date: data.date,
      tags: data.tags,
      content: htmlContent
    });
  } catch {
    return Response.json({ error: 'Post not found' }, { status: 404 });
  }
}

// app/blog/[slug]/page.tsx
type BlogPost = {
  title: string;
  date: string;
  tags: string[];
  content: string;
}

type Props = {
  params: {
    slug: string;
  }
}

export default async function BlogPage({ params }: Props) {
  const { slug } = params;
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`);
  const post: BlogPost = await response.json();
  
  if (!post || 'error' in post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-4">
        <time>{new Date(post.date).toLocaleDateString()}</time>
        {post.tags && (
          <div className="mt-2">
            {post.tags.map(tag => (
              <span key={tag} className="mr-2 text-sm bg-gray-100 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

// Optionally, if you want to generate static paths:
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'public/content/blog');
  const files = await fs.readdir(postsDirectory);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      slug: file.replace('.md', '')
    }));
}