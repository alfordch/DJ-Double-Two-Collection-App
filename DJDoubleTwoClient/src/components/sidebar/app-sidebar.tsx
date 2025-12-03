import { useState, useEffect }from "react"
import { NavMain } from "@/components/sidebar/nav-main"
import { AppSidebarHeader } from "@/components/sidebar/sidebar-header"

import {
  Sidebar,
  SidebarContent,
  /* SidebarFooter, */
} from "@/components/ui/sidebar"

import {
  MicVocal,
  Music,
  Disc3,
  LibraryBig,
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
  const [reload, setReload] = useState("");

  return (
    <Sidebar variant="floating" collapsible="icon" className="transition-all duration-200" {...props}>
      <AppSidebarHeader headerItems={data.headerItems} />
      <SidebarContent>
        <NavMain navItems={data.navItems} />
      </SidebarContent>
    </Sidebar>
  )
}