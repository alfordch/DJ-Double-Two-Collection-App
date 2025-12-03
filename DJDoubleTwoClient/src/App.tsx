import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { ThemeProvider } from '@/components/theme/theme-provider'

// Main content
import Artists from "@/components/main-content/artists"
import Tracks from "@/components/main-content/tracks"
import Items from "@/components/main-content/items"

export default function App() {
   const location = useLocation();
   const hideSidebar = location.pathname === "/users";
   
   return (
      <ThemeProvider>
         <SidebarProvider style={{ "--sidebar-width": "13rem" } as React.CSSProperties}>
            {!hideSidebar && <AppSidebar />}
            <SidebarInset style={{ marginLeft: "-1rem" } as React.CSSProperties}>
               <Routes>
                  <Route path="/" element={<Tracks />} />
                  <Route path="/artists" element={<Artists />} />
                  <Route path="/tracks" element={<Tracks />} />
                  <Route path="/items" element={<Items />} />
               </Routes>
            </SidebarInset>
         </SidebarProvider>
      </ThemeProvider>
   )
}