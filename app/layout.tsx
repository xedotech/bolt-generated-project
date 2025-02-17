import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Shield, Home, Wallet, Network, Star, QrCode, Cpu } from "lucide-react"
import Link from "next/link"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ShieldNet DVPN",
  description: "Decentralized VPN for Ultimate Privacy",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <aside className="w-16 border-r min-h-screen flex flex-col items-center py-4 gap-4">
          <div className="mb-8">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <Link href="/dashboard" className="p-2">
            <Home className="w-6 h-6 text-muted-foreground" />
          </Link>
          <Link href="/wallet" className="p-2">
            <Wallet className="w-6 h-6 text-muted-foreground" />
          </Link>
          <Link href="/network" className="p-2">
            <Network className="w-6 h-6 text-muted-foreground" />
          </Link>
          <Link href="/tasks" className="p-2">
            <Star className="w-6 h-6 text-muted-foreground" />
          </Link>
          <Link href="/passport" className="p-2">
            <QrCode className="w-6 h-6 text-muted-foreground" />
          </Link>
          <Link href="/mobile-mining" className="p-2">
            <Cpu className="w-6 h-6 text-muted-foreground" />
          </Link>
        </aside>
        <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
