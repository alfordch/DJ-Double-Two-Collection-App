import { LucideIcon, LogIn, LogOut, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useGlobalAppState, globalAppInterface } from "@/app-context/app-context"

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

export function AppSidebarUser({ ...props }: any) {
   const { userLoggedIn } = useGlobalAppState()
   const { setState } = useGlobalAppState()
   const { isMobile } = useSidebar()
   
   // Logout still goes to the login page, but that is fine in case a user wants to immediately log back in
   const handleLogout = async() => {
      if (userLoggedIn.userLoggedIn) {
         localStorage.clear()
         setState({
            userLoggedIn: false,
            userName: 'Log In',
            displayName: 'Log In',
            avatar: '',
         })
         window.location.reload()
      }
      return
   }

   return (
      <SidebarMenu>
         <SidebarMenuItem onClick={handleLogout}>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Link to="/users">
                     <SidebarMenuButton size="lg" className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <Avatar className="h-8 w-8 rounded-lg">
                           <AvatarFallback className="rounded-lg">
                              {userLoggedIn.userLoggedIn ?
                                 userLoggedIn.avatar
                                 :
                                 <User/>
                              }
                           </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-medium">{userLoggedIn.displayName}</span>
                        </div>
                        {userLoggedIn.userLoggedIn ? <LogOut className="ml-auto size-4" /> : <LogIn className="ml-auto size-4" />}
                     </SidebarMenuButton>
                  </Link>
               </TooltipTrigger>
               <TooltipContent>
                  {userLoggedIn.userLoggedIn ? <p className="m-1">Logout</p> : <p className="m-1">Login</p>}
               </TooltipContent>
            </Tooltip>
         </SidebarMenuItem>
      </SidebarMenu>
   )
}