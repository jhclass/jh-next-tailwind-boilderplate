'use client'
import { Outfit } from 'next/font/google'
import './globals.css'
import { SidebarProvider } from '@/context/SidebarContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const outfit = Outfit({
  variable: '--font-outfit-sans',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = localStorage.getItem('token')
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (token === null) {
      alert('Your token has expired.')
      router.push('/signin')
      setLoading(false)
    }
  }, [token, router])

  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{loading ? 'Loading...' : children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
