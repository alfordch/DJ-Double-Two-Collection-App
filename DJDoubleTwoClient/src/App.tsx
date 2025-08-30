import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { ThemeProvider } from '@/components/theme/theme-provider'
import { MainHeader } from '@/components/main-header'

// Main content
import Artists from "@/components/main-content/artists"
import Tracks from "@/components/main-content/tracks"
import Items from "@/components/main-content/items"
import Selections from '@/components/main-content/selections'
import LoginPage from '@/components/login-page'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const location = useLocation();
  const hideSidebar = location.pathname === "/users";
  return (
    <ThemeProvider>

      <SidebarProvider style={{ "--sidebar-width": "13rem" } as React.CSSProperties}>

        {!hideSidebar && <AppSidebar loggedIn = {loggedIn} />}

        <SidebarInset style={{ marginLeft: "-1rem" } as React.CSSProperties}>

          <Routes>
            <Route path="/" element={<Tracks />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/items" element={<Items />} />
            <Route path="/selections" element={<Selections />} />
            <Route path="/users" element={<LoginPage setLoginState={setLoggedIn} />} />
          </Routes>

        </SidebarInset>

      </SidebarProvider>

    </ThemeProvider>
  )
}