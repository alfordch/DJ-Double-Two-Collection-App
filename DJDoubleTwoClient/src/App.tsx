import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/desktop/sidebar/app-sidebar"
import { ThemeProvider } from '@/components/theme/theme-provider'
import { MobileHeader } from "@/components/mobile/mobile-header/mobile-header"

// Main content
import MainContent from '@/components/desktop/main-content/main-content'
import MobileMainContent from '@/components/mobile/mobile-main-content/main-content'

export default function App() {
   const location = useLocation().pathname;
   //const hideSidebar = location.pathname === "/users";
   
   // Viewport detection
   const mobile = useMediaQuery({ query: '(max-width: 1023px)' })
   const desktop = useMediaQuery({ query: '(min-width: 1024px)' })

   return (
      <ThemeProvider>
         {desktop &&
            <SidebarProvider style={{ "--sidebar-width": "13rem" } as React.CSSProperties}>
               <AppSidebar />
               <SidebarInset style={{ marginLeft: "-1rem" } as React.CSSProperties}>
                  <Routes>
                     <Route path="/" element={<MainContent key="tracks" contentType='Tracks' />} />
                     <Route path="/tracks" element={<MainContent key="tracks" contentType='Tracks' />} />
                     <Route path="/artists" element={<MainContent key="artists" contentType='Artists' />} />
                     <Route path="/items" element={<MainContent key="items" contentType='Items' />} />
                  </Routes>
               </SidebarInset>
            </SidebarProvider>
         }
         
         {mobile &&
            <div>
               <MobileHeader path={location}/>
                  <Routes>
                     <Route path="/" element={<MobileMainContent key="tracks" contentType='Tracks' />} />
                     <Route path="/tracks" element={<MobileMainContent key="tracks" contentType='Tracks' />} />
                     <Route path="/artists" element={<MobileMainContent key="artists" contentType='Artists' />} />
                     <Route path="/items" element={<MobileMainContent key="items" contentType='Items' />} />
                  </Routes>
            </div>
         }
      </ThemeProvider>
   )
}