import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import PageTitle from "../components/PageTitle";
import { formatDate } from '@/utils/formatDate';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen pt-32 px-4 max-w-6xl mx-auto">
      <div className={`space-y-16 transition-all duration-1000`}>
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
              <article 
                className="p-6 bg-blue-500/10 rounded-lg transition-all duration-300 
                         hover:bg-blue-500/20 hover:scale-[1.02] border border-blue-400/20
                         shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                <h2 className="text-2xl font-bold text-blue-400 mb-4">{post.title}</h2>
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
    </main>
  );
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(path.join(process.cwd(), 'content/blog'));
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(process.cwd(), 'content/blog', filename);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        date: data.date,
        tags: data.tags,
      };
    })
  );

  // Sort posts by date, newest first
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // This will put newest dates first
  });
}