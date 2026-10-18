import { NavMain } from "@/components/desktop/sidebar/nav-main"
import { AppSidebarHeader } from "@/components/desktop/sidebar/sidebar-header"
import Footer from '@/components/universal/footer/footer'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent
} from "@/components/ui/sidebar"

import {
  MicVocal,
  Music,
  Disc3,
} from "lucide-react"

const data = {
  navItems: [
    { name: "Tracks", url: "/tracks", icon: Music },
    { name: "Artists", url: "/artists", icon: MicVocal },
    { name: "Items", url: "/items", icon: Disc3 },
  ],
  headerItems: {
    name: "DDT Logo",
    icon: "/DJDoubleTwo_IV_Logo.png",
    title: "DJ Double Two",
    subhead: "Media Collection",
  },
}

export function AppSidebar({...props }: any) {

  return (
    <Sidebar variant="floating" collapsible="icon" className="transition-all duration-200" {...props}>
      <AppSidebarHeader headerItems={data.headerItems} />
      <SidebarContent>
        <NavMain navItems={data.navItems} />
      </SidebarContent>
      <SidebarGroup className='-mb-3'>
        <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
          <SidebarFooter>
            <Footer />
          </SidebarFooter>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  )
}