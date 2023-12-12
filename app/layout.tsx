import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import theme from './components/theme'
import { ThemeProvider } from '@mui/material'
import CssBaseline from "@mui/material/CssBaseline";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ThemeProvider>
  )
}