/* import { ModeToggle } from "@/components/theme/mode-toggle" */

import {
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebarHeader({ headerItems }: {
   headerItems: {
      name: string
      icon: string
      title: string
      subhead: string
   }
   }) {
   return (
      <SidebarHeader>
         <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                     <a href="#/" className="flex items-center gap-2">
                     <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                           <img
                           src={headerItems.icon}
                           alt={headerItems.name}
                           className="h-8 w-8 rounded-md"
                           />
                     </div>
                     <div className="flex flex-col gap-0.5 leading-none">
                           <span className="font-medium">{headerItems.title}</span>
                           <span>{headerItems.subhead}</span>
                     </div>
                     </a>
                  </SidebarMenuButton>
               </SidebarMenuItem>
         </SidebarMenu>
      </SidebarHeader>
   )
}