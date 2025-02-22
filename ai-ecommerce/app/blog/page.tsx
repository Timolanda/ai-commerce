import Link from "next/link"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "Summer Fashion Trends 2023",
    excerpt: "Discover the hottest styles for the upcoming summer season.",
  },
  { id: 2, title: "How to Style a White T-Shirt", excerpt: "Learn versatile ways to wear this wardrobe staple." },
  {
    id: 3,
    title: "Sustainable Fashion: What You Need to Know",
    excerpt: "Explore eco-friendly fashion choices and their impact.",
  },
]

export default function Blog() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Fashion Blog</h1>
      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="border p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="mb-4">{post.excerpt}</p>
            <Link href={`/blog/${post.id}`}>
              <Button variant="outline">Read More</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

