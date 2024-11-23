import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import PageTitle from "../components/PageTitle";
import { formatDate } from '@/utils/formatDate';
import BackgroundIcons from '../components/BackgroundIcons';
import { Montserrat as montserratFont } from 'next/font/google';  // Import directly from next/font/google

// Initialize the font
const montserrat = montserratFont({ subsets: ['latin'] });

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const files = await fs.readdir(postsDirectory);
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
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
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <div className={`min-h-screen pt-32 px-4 max-w-6xl mx-auto relative overflow-hidden ${montserrat.className}`}>
      <BackgroundIcons />
      <div className="relative z-10">
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
              <article className="p-6 bg-blue-500/10 backdrop-blur-sm rounded-lg transition-all duration-300 
                         hover:bg-blue-500/20 hover:scale-[1.02] border border-blue-400/20
                         shadow-[0_0_15px_rgba(59,130,246,0.2)]">
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