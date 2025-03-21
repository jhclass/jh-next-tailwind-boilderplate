'use client'
import { Outfit } from 'next/font/google'
import './globals.css'
import { SidebarProvider } from '@/context/SidebarContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGlobalErrorStore } from '@/store/errorStore'

const outfit = Outfit({
  variable: '--font-outfit-sans',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { error, clearError } = useGlobalErrorStore()
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
    if (token === null) {
      alert('Your token has expired.')
      router.push('/signin')
      setLoading(false)
    }
  }, [token, router])

  useEffect(() => {
    if (error) {
      alert('에러발생') //예시 토스트 페이지 라우팅등 필요한 작업을 하세요
      clearError()
    }
  }, [error])
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
