// src/app/api/posts/[slug]/route.ts
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  
  const postsDirectory = path.join(process.cwd(), 'public/content/blog')
  const filePath = path.join(postsDirectory, `${slug}.md`)
  
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const htmlContent = marked(content)
    
    return Response.json({
      title: data.title,
      date: data.date,
      tags: data.tags,
      content: htmlContent
    })
  } catch {
    return Response.json({ error: 'Post not found' }, { status: 404 })
  }
}