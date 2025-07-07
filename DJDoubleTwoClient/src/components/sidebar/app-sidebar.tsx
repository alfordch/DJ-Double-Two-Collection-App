import * as React from "react"
import { NavMain } from "@/components/sidebar/nav-main"
import { AppSidebarHeader } from "@/components/sidebar/sidebar-header"
import { AppSidebarUser } from "@/components/sidebar/sidebar-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar"

import {
  MicVocal,
  Music,
  Disc3,
  User,
} from "lucide-react"

const data = {
  navItems: [
    { name: "Artists", url: "#3", icon: MicVocal },
    { name: "Tracks", url: "#2", icon: Music },
    { name: "Items", url: "#1", icon: Disc3 },
  ],
  headerItems: {
    name: "DDT Logo",
    icon: "/DJDoubleTwo_IV_Logo.png",
    title: "DJ Double Two",
    subhead: "Media Collection",
  },
  defaultUser: {
    name: "Log In",
    avatar: "",
    fallback: User,
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" collapsible="icon" className="transition-all duration-200" {...props}>
      <AppSidebarHeader headerItems={data.headerItems} />
      <SidebarContent>
        <NavMain navItems={data.navItems} />
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarUser user={data.defaultUser} />
      </SidebarFooter>
    </Sidebar>
  )
}