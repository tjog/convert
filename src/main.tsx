import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import './index.css'
import { SiteHeader } from './components/site-header.tsx'
import { SiteFooter } from './components/site-footer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1"><App /></main>
        <SiteFooter />
      </div>

    </ThemeProvider>
  </React.StrictMode>,
)
