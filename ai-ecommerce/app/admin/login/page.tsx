"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    // In a real app, you'd validate credentials against a backend
    if (username === "admin" && password === "password") {
      router.push("/admin/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  )
}

