import { useState, useEffect }from "react"
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
  user: {
    name: "Log In",
    avatar: "",
    fallback: User,
  }
}

export function AppSidebar({loggedIn, ...props }: any) {
  const [reload, setReload] = useState("");

  useEffect(() => {
    // Handle showing the selections route and footer user
    if (loggedIn && data.navItems.length < 4) {
      data.navItems.push({ name: "Selections", url: "/selections", icon: LibraryBig });
      data.user.name = localStorage.getItem("displayName")!.toString();
      setReload("new")
    }
    if (!loggedIn && data.navItems.length == 4) {
      data.navItems.pop();
    }
  }, [loggedIn]);

  return (
    <Sidebar variant="floating" collapsible="icon" className="transition-all duration-200" {...props}>
      <AppSidebarHeader headerItems={data.headerItems} />
      <SidebarContent>
        <NavMain navItems={data.navItems} />
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarUser user={data.user} loggedIn={loggedIn} />
      </SidebarFooter>
    </Sidebar>
  )
}