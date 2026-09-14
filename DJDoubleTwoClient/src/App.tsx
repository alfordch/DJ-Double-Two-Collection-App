import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { ThemeProvider } from '@/components/theme/theme-provider'

// Main content
import Artists from "@/components/main-content/artists"
import Tracks from "@/components/main-content/tracks"
import Items from "@/components/main-content/items"

export default function App() {
   // Deprecated /users route
   //const location = useLocation();
   //const hideSidebar = location.pathname === "/users";
   
   // Viewport detection
   const mobile = useMediaQuery({ query: '(min-width: 640px)' })
   const desktop = useMediaQuery({ query: '(min-width: 1024px)' })

   return (
      <ThemeProvider>
         {desktop &&
            <SidebarProvider style={{ "--sidebar-width": "13rem" } as React.CSSProperties}>
               <AppSidebar />
               <SidebarInset style={{ marginLeft: "-1rem" } as React.CSSProperties}>
                  <Routes>
                     <Route path="/" element={<Tracks />} />
                     <Route path="/artists" element={<Artists />} />
                     <Route path="/tracks" element={<Tracks />} />
                     <Route path="/items" element={<Items />} />
                  </Routes>
               </SidebarInset>
            </SidebarProvider>
         }
      </ThemeProvider>
   )
}