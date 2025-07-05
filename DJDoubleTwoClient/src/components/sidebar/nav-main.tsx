import type { LucideIcon } from "lucide-react"

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
              <a href={item.url} className="flex items-center gap-2">
                <item.icon className="size-5" />
                <span /* className="group-data-[collapsible=collapsed]:hidden" */>
                  {item.name}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}