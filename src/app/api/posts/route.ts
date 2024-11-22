import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { NextRequest } from 'next/server';

// For dynamic route segments
interface Context {
  params: {
    slug: string;
  };
}

export async function GET(
  request: NextRequest,
  context: Context
) {
  const postsDirectory = path.join(process.cwd(), 'public/content/blog');
  const filePath = path.join(postsDirectory, `${context.params.slug}.md`);

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