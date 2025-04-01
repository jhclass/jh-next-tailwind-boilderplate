import { getMessages, getLocale } from 'next-intl/server'
import ClientRootLayout from '@/app/ClientRootlayout'

export const metadata = {
  title: 'My App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <ClientRootLayout locale={locale} messages={messages}>
          {children}
        </ClientRootLayout>
      </body>
    </html>
  )
}
