import './globals.css'

export const metadata = {
  title: 'DarkSecret | Real-time Messenger',
  description: 'Premium Next.js Chat Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  )
}
