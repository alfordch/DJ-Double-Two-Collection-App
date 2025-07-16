import type { LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"


export function NavMain({navItems}: {
  navItems: {
      name: string
      url: string
      icon: LucideIcon
  }[]
  }) {

  const { isMobile } = useSidebar()

  return (
    <SidebarGroup /* className="group-data-[collapsible=icon]" */>
      <SidebarGroupLabel>Selections</SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link to={item.url} className="flex items-center gap-2">
                <item.icon className="size-4" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}