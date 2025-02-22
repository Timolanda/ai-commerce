"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboard() {
  const [products, setProducts] = useState([
    { id: 1, name: "Classic White Tee", price: 29.99, category: "Tops", inventory: 100 },
    { id: 2, name: "Slim Fit Jeans", price: 59.99, category: "Bottoms", inventory: 50 },
    { id: 3, name: "Leather Jacket", price: 199.99, category: "Tops", inventory: 25 },
  ])

  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", inventory: "" })

  const addProduct = (e) => {
    e.preventDefault()
    setProducts([...products, { ...newProduct, id: Date.now() }])
    setNewProduct({ name: "", price: "", category: "", inventory: "" })
  }

  const updateInventory = (id, newInventory) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, inventory: Number.parseInt(newInventory) } : product,
      ),
    )
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={addProduct} className="mb-8">
        <Input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="mb-4"
        />
        <Input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="mb-4"
        />
        <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tops">Tops</SelectItem>
            <SelectItem value="Bottoms">Bottoms</SelectItem>
            <SelectItem value="Dresses">Dresses</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Inventory"
          value={newProduct.inventory}
          onChange={(e) => setNewProduct({ ...newProduct, inventory: e.target.value })}
          className="mb-4"
        />
        <Button type="submit">Add Product</Button>
      </form>
      <h2 className="text-2xl font-semibold mb-4">Inventory Management</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-4 flex items-center justify-between">
            <span>
              {product.name} - ${product.price} - {product.category}
            </span>
            <div>
              <Input
                type="number"
                value={product.inventory}
                onChange={(e) => updateInventory(product.id, e.target.value)}
                className="w-24 mr-2"
              />
              <span>in stock</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

