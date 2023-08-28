// Library imports
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// Custom imports
import AuthProvider from "@/components/AuthProvider";
import "@/styles/globals.css";

const inter = Inter({ subsets: ['latin'] })

// Metadata
export const metadata: Metadata = {
  title: 'CodeBuddy',
  description: 'Web application that helps students to code',
  viewport: 'width=device-width, initial-scale=1'
}

// RootLayout
export default function RootLayout({children} : {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
          
      <body>
        <AuthProvider>
          <div className={inter.className}>{children}</div>
        </AuthProvider>
      </body>
    </html>
  )
}
