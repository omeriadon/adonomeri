import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { notFound } from 'next/navigation';
import 'highlight.js/styles/default.css';
import { formatDate } from '@/utils/formatDate';
import '../../styles/markdownStyles.css';
import BackgroundIcons from '../../components/BackgroundIcons';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

type BlogParams = Promise<{ slug: string }>;

// Initialize the font
const montserrat = Montserrat({ subsets: ['latin'] });

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
      <div className='relative min-h-screen'>
        <Link 
          href="/blog" 
          className="fixed left-4 md:left-8 top-20 md:top-24 z-30 card-hover w-16 h-16 flex items-center justify-center"
          aria-label="Back to blogs"
        >
          <div className='font-bold text-2xl'>      
            <i className="bi bi-chevron-left"></i>
          </div>
        </Link>

        <div className="markdown max-w-4xl pb-32 mx-auto mt-32 px-4 relative overflow-hidden card">

          <BackgroundIcons />
          <div className="relative z-10">
            <h1 className={`text-4xl font-bold text-blue-400 mb-4 ${montserrat.className}`}>
              {data.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm">
                {formatDate(data.date)}
              </span>
              {data.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}