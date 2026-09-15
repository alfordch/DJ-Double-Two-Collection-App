import { Link, useLocation } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MobileHeader() {
    return (
        <div className="flex justify-between items-center h-1/10 bg-accent p-3 m-3 backdrop-blur-md rounded-lg">
            <a href="#/">
                <img src="/DJDoubleTwo_IV_Logo.png" className="size-10 rounded-md"></img>
            </a>
        </div>
    )
}