// ...existing code...

export async function generateMetadata({ params }) {
  // You can fetch the blog post data using the slug
  // This is just a placeholder - replace with your actual data fetching logic
  const post = await getPostBySlug(params.slug);
  
  return {
    title: `${post.title} | Adon Omeri's Blog`,
    description: post.excerpt || `Read about ${post.title} in Adon Omeri's blog, covering insights and experiences in technology.`
  };
}

// ...existing code...
