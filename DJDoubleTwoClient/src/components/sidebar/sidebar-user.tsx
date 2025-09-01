import { LucideIcon, LogIn, LogOut } from "lucide-react"
import { Link } from "react-router-dom"

import {
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from "@/components/ui/sidebar"

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from "@/components/ui/avatar"

import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip"

export function AppSidebarUser({ user, loggedIn }: {
   user: {
      name: string
      avatar: string
      fallback: LucideIcon
   },
   loggedIn: any
   }) {

   const { isMobile } = useSidebar()
   let userAcronym = user.name.match(/[A-Z]/g)?.slice(0,2)

   // Logout still goes to the login page, but that is fine in case a user wants to immediately log back in
   const handleLogout = async() => {
      if (loggedIn) {
      localStorage.clear()
      window.location.reload()
      }
      return
   }

   return (
      <SidebarMenu>
         <SidebarMenuItem onClick={handleLogout}>
            <Tooltip>
               <TooltipTrigger asChild>
               {!loggedIn ?
                  <Link to="/users">
                     <SidebarMenuButton size="lg" className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                     <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg">
                           <user.fallback/>
                        </AvatarFallback>
                     </Avatar>
                     <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{user.name}</span>
                     </div>
                     <LogIn className="ml-auto size-4" />
                     </SidebarMenuButton>
                  </Link> 
               :
                  <Link to="/users">
                     <SidebarMenuButton size="lg" className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                     <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg">
                           { userAcronym  || <user.fallback />}
                        </AvatarFallback>
                     </Avatar>
                     <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{localStorage.displayName}</span>
                     </div>
                     <LogOut className="ml-auto size-4" />
                     </SidebarMenuButton>
                  </Link>
               }
               </TooltipTrigger>
               <TooltipContent>
               {loggedIn ? <p className="m-1">Logout</p> : <p className="m-1">Login</p>}
               </TooltipContent>
            </Tooltip>
         </SidebarMenuItem>
      </SidebarMenu>
   )
}