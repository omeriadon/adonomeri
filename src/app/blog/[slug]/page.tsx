import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { notFound } from 'next/navigation';
import 'highlight.js/styles/default.css';

type BlogParams = Promise<{ slug: string }>;

export default async function BlogPost(props: { params: BlogParams }) {
  // Await the params
  const { slug } = await props.params;
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      highlight: (code: string, lang: string) => {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    } as any);

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