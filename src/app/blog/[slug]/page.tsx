import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { notFound } from 'next/navigation';

interface BlogPostProps {
  params: { slug: string };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Configure marked to use highlight.js
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      highlight: (code: string, lang: string) => {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    } as any);

    // Convert markdown to HTML
    const htmlContent = marked(content);

    return (
      <div className="markdown">
        <h1>{data.title}</h1>
        <p>{data.date}</p>
        <div>{data.tags.join(', ')}</div>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
