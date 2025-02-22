"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    if (error) {
      console.error("Auth error:", error)
    }
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
      <p className="text-red-500 mb-4">
        {error === "CredentialsSignin" ? "Invalid credentials" : "An error occurred during authentication"}
      </p>
      <Link href="/auth/signin">
        <Button variant="outline">Try Again</Button>
      </Link>
    </div>
  )
}

