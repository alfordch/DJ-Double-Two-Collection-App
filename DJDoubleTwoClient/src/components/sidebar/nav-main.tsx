import type { LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

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
   const location = useLocation()

   return (
      <SidebarGroup>
         <SidebarGroupLabel>Selections</SidebarGroupLabel>
         <SidebarMenu className="gap-1">
            {navItems.map((item) => {
               if (location.pathname.substring(1) === item.name.replace(/\s/g, "").toLowerCase()) {
                  return(
                     <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild isActive>
                           <Link to={item.url} className="flex items-center gap-2">
                              <item.icon className="size-4" />
                              <span>{item.name}</span>
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  )
               }
               else if (location.pathname === '/' && item.name === 'Tracks') {
                  return(
                     <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild isActive>
                           <Link to={item.url} className="flex items-center gap-2">
                              <item.icon className="size-4" />
                              <span>{item.name}</span>
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  )
               }
               else {
                  return(
                     <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                           <Link to={item.url} className="flex items-center gap-2">
                              <item.icon className="size-4" />
                              <span>{item.name}</span>
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  )
               }
            })}
         </SidebarMenu>
      </SidebarGroup>
   )
}