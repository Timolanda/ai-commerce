"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingBag } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type React from "react"

export default function Header() {
  const { data: session, status } = useSession()

  const handleSignOut = async (event: React.MouseEvent) => {
    event.preventDefault()
    try {
      await signOut({ redirect: true, callbackUrl: "/" })
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const handleSignIn = async (event: React.MouseEvent) => {
    event.preventDefault()
    try {
      await signIn(undefined, { callbackUrl: "/" })
    } catch (error) {
      console.error("Sign in error:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          Pesabrand Virtual
        </Link>
        <div className="flex items-center space-x-4">
          <form className="relative">
            <Input type="search" placeholder="Search..." className="pl-10 pr-4 py-2 w-64" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/category/tops" className="w-full">
                  Tops
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/category/bottoms" className="w-full">
                  Bottoms
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/category/dresses" className="w-full">
                  Dresses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {status === "authenticated" && session ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {session.user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="w-full">
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onSelect={handleSignOut}>Logout</DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onSelect={handleSignIn}>Login</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingBag size={24} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

