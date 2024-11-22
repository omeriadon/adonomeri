import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
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
          excerpt: content.substring(0, 100) + '...',
        };
      })
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load posts' });
  }
}