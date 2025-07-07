import { useState } from 'react'
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { ThemeProvider } from '@/components/theme/theme-provider'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { Separator } from "@/components/ui/separator"

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <ModeToggle />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          Header
        </header>
      </SidebarProvider>
    </ThemeProvider>
  )
}