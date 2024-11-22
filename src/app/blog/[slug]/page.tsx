import fs from 'fs/promises';
import path from 'path';
import * as marked from 'marked';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import '../../styles/markdownStyles.css';

// Types for blog post metadata
interface BlogPost {
  title: string;
  date: string;
  description: string;
  content: string;
  tags?: string[];
}

// Configure marked with syntax highlighting
const renderer = new marked.Renderer();

renderer.code = function(code: marked.Tokens.Code): string {
  const language = code.lang || 'plaintext';
  const highlighted = hljs.getLanguage(language)
    ? hljs.highlight(code.text, { language }).value
    : hljs.highlightAuto(code.text).value;

  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

marked.setOptions({
  renderer,
  gfm: true,
  breaks: true,
});

// Fetch and parse blog post
async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
  const fileContent = await fs.readFile(filePath, 'utf8');

  // Parse frontmatter and content
  const { data, content } = matter(fileContent);

  return {
    title: data.title || 'Untitled',
    date: data.date ? new Date(data.date).toLocaleDateString() : '',
    description: data.description || '',
    content: await marked.parse(content), // Generate HTML content
    tags: data.tags || [],
  };
}

// React component for rendering blog post
export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const post = await getBlogPost(params.slug);

    return (
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 pt-32 pb-24">
          {/* Page Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-blue-500">
            {post.title}
          </h1>

          {/* Blog Content */}
          <article
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></article>
        </div>
      </main>
    );
  } catch {
    console.error('Error loading blog post');
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-red-400">
        Failed to load blog post
      </div>
    );
  }
  

}
