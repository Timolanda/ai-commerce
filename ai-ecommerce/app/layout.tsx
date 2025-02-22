import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import AuthProvider from "@/components/providers/AuthProvider"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Pesabrand Virtual",
  description: "Experience virtual fashion shopping with Pesabrand",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'