import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ReduxProvider from "./ReduxProvider"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Monopoly",
  description: "Monopoly --- Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </ReduxProvider>
    </html>
  )
}
