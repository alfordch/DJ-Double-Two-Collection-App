import { Routes, Route } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/desktop/sidebar/app-sidebar"
import { ThemeProvider } from '@/components/theme/theme-provider'
import { MobileHeader } from "@/components/mobile/mobile-header/mobile-header"

// Main content
import MainContent from '@/components/desktop/main-content/main-content'
import MobileMainContent from '@/components/mobile/mobile-main-content/mobile-main-content'
import Footer from '@/components/universal/footer/footer'
import About from '@/components/universal/about/about'

export default function App() {
   
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
                     <Route path="/about" element={<About/>} />
                  </Routes>
               </SidebarInset>
            </SidebarProvider>
         }
         
         {mobile &&
            <div className='flex flex-col min-h-screen'>
               <div className='grow'>
                  <MobileHeader/>
                  <Routes>
                     <Route path="/" element={<MobileMainContent key="tracks" contentType='Tracks' />} />
                     <Route path="/tracks" element={<MobileMainContent key="tracks" contentType='Tracks' />} />
                     <Route path="/artists" element={<MobileMainContent key="artists" contentType='Artists' />} />
                     <Route path="/items" element={<MobileMainContent key="items" contentType='Items' />} />
                     <Route path="/about" element={<About/>} />
                  </Routes>
               </div>
               <Footer/>
            </div>
         }
      </ThemeProvider>
   )
}