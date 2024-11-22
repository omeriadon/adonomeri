import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export default async function BlogPage() {
  // Fetch blog posts on the server
  const posts = await getBlogPosts();

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post.slug} className="p-6 bg-blue-500/10 rounded-lg">
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-bold text-blue-400 mb-2">{post.title}</h2>
          </Link>
          <p className="text-gray-400 mb-2">{post.date}</p>
          <div className="mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-500/20 text-blue-400 px-2 py-1 rounded mr-2 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-300">{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(path.join(process.cwd(), 'content/blog'));
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(process.cwd(), 'content/blog', filename);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        date: data.date,
        tags: data.tags,
        excerpt: content.substring(0, 200) + '...',
      };
    })
  );

  // Sort posts by date (newest first)
  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}