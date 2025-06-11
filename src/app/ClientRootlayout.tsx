'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Outfit } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { SidebarProvider } from '@/context/SidebarContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { useGlobalErrorStore } from '@/store/errorStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StorageUtil from '@/lib/storage'

import './globals.css'

const outfit = Outfit({
  variable: '--font-outfit-sans',
  subsets: ['latin'],
})

interface Itoken {
  token: string | null
}

interface Props {
  children: React.ReactNode
  locale: string
  messages: Record<string, any>
}

export default function ClientRootLayout({
  children,
  locale,
  messages,
}: Props) {
  const router = useRouter()
  const [token, setToken] = useState<Itoken | null>(null)
  const [loading, setLoading] = useState(true)
  const { error, clearError } = useGlobalErrorStore()
  const queryClient = new QueryClient()

  useEffect(() => {
    const storedToken = StorageUtil.get<Itoken>('token')
    console.log(storedToken)
    setToken(storedToken)

    if (!storedToken) {
      alert('Your token has expired.')
      router.push('/signin')
    }

    setLoading(false)
  }, [router])

  useEffect(() => {
    if (error) {
      alert('에러발생')
      clearError()
    }
  }, [error])

  return (
    <div className={outfit.variable}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SidebarProvider>
              {loading ? 'Loading...' : children}
            </SidebarProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  )
}
