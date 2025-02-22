"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/ProductCard"

// In a real app, you'd fetch this data from an API
const products = [
  {
    id: 1,
    name: "Classic White Tee",
    price: 29.99,
    imageSrc: "/placeholder.svg",
    sizes: ["S", "M", "L", "XL"],
    category: "Tops",
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    imageSrc: "/placeholder.svg",
    sizes: ["28", "30", "32", "34"],
    category: "Bottoms",
  },
  {
    id: 3,
    name: "Leather Jacket",
    price: 199.99,
    imageSrc: "/placeholder.svg",
    sizes: ["S", "M", "L"],
    category: "Tops",
  },
  // Add more products here
]

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [recommendedProducts, setRecommendedProducts] = useState([])

  useEffect(() => {
    // In a real app, you'd fetch the product data from an API
    const fetchedProduct = products.find((p) => p.id === Number.parseInt(params.id))
    setProduct(fetchedProduct)

    // Simple recommendation system: products in the same category
    const recommendations = products
      .filter((p) => p.category === fetchedProduct.category && p.id !== fetchedProduct.id)
      .slice(0, 3)
    setRecommendedProducts(recommendations)
  }, [params.id])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Image
          src={product.imageSrc || "/placeholder.svg"}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
          <div className="mb-4">
            <label className="block mb-2">Size</label>
            <Select onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mb-4">Add to Cart</Button>
          <Link href={`/try-on?productId=${product.id}`}>
            <Button variant="outline" className="w-full">
              Try On
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  )
}

