import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductCard({ id, name, price, imageSrc }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={name}
        width={300}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>
        <div className="flex justify-between mt-4">
          <Link href={`/product/${id}`}>
            <Button variant="outline">Details</Button>
          </Link>
          <Link href={`/try-on?productId=${id}`}>
            <Button>Try On</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

