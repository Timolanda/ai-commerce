import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          // In a real app, you'd check against your database
          if (credentials.email === "user@example.com" && credentials.password === "password") {
            return {
              id: "1",
              email: "user@example.com",
              name: "Demo User",
              role: "user",
            }
          }

          if (credentials.email === "admin@example.com" && credentials.password === "adminpassword") {
            return {
              id: "2",
              email: "admin@example.com",
              name: "Admin User",
              role: "admin",
            }
          }

          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")

      if (isOnAdmin) {
        if (isLoggedIn) return true
        return false
      }
      return true
    },
  },
} satisfies NextAuthConfig

