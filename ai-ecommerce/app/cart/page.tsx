"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// In a real app, you'd manage the cart state globally (e.g., with Context or Redux)
const initialCart = [
  { id: 1, name: "Classic White Tee", price: 29.99, imageSrc: "/placeholder.svg", quantity: 1 },
  { id: 2, name: "Slim Fit Jeans", price: 59.99, imageSrc: "/placeholder.svg", quantity: 1 },
]

export default function Cart() {
  const [cart, setCart] = useState(initialCart)

  const updateQuantity = (id, newQuantity) => {
    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <Image
                  src={item.imageSrc || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <Button className="w-full mt-4">Proceed to Checkout</Button>
          </div>
        </>
      )}
      <Link href="/">
        <Button variant="outline" className="mt-4">
          Continue Shopping
        </Button>
      </Link>
    </div>
  )
}

