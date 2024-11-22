import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';


interface BlogPostProps {
  title: string;
  date: string;
  tags: string[];
  content: string;
}

export default function BlogPost({ title, date, tags, content }: BlogPostProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      <div>{tags.join(', ')}</div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await fs.readdir(path.join(process.cwd(), 'content/blog'));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
  const fileContent = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    props: {
      title: data.title,
      date: data.date,
      tags: data.tags,
      content,
    },
  };
};