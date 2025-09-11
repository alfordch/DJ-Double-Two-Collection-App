import { useState, useEffect }from "react"
import { NavMain } from "@/components/sidebar/nav-main"
import { AppSidebarHeader } from "@/components/sidebar/sidebar-header"
import { AppSidebarUser } from "@/components/sidebar/sidebar-user"
import { useGlobalAppState, globalAppInterface } from "@/app-context/app-context"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  const { userLoggedIn } = useGlobalAppState();

  useEffect(() => {
    // Handle showing the selections route and footer user
    if (userLoggedIn.userLoggedIn && data.navItems.length < 4) {
      data.navItems.push({ name: "My Selections", url: "/myselections", icon: LibraryBig });
      setReload("new")
    }
    if (!userLoggedIn && data.navItems.length == 4) {
      data.navItems.pop();
    }
  }, [userLoggedIn]);

  return (
    <Sidebar variant="floating" collapsible="icon" className="transition-all duration-200" {...props}>
      <AppSidebarHeader headerItems={data.headerItems} />
      <SidebarContent>
        <NavMain navItems={data.navItems} />
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarUser />
      </SidebarFooter>
    </Sidebar>
  )
}