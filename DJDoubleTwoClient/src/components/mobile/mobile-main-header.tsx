import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { Music, Disc3, MicVocal } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function MobileMainHeader({ headertext = "..."}) {
    const headers = ['Tracks','Items','Artists']
    const clientRoutes = ['/tracks', '/items', '/artists']
    const icons = [Music, Disc3, MicVocal]

    const usedIndex = headers.indexOf(headertext)

    headers.splice(usedIndex,1)
    clientRoutes.splice(usedIndex,1)
    icons.splice(usedIndex,1)

    return(
        <header className="flex h-16 shrink-0 items-center gap-2 pl-2">
            <NavigationMenu>
                <NavigationMenuItem className="list-none">
                    <NavigationMenuTrigger>
                        <h1 className="text-base font-medium">{ headertext }</h1>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul>
                            <li>
                                {headers.map((routeText: any, idx: number) => {
                                    const Icon = icons[idx]
                                    return (
                                        <NavigationMenuLink asChild key={idx} className="flex-row items-center gap-2"><Link to={clientRoutes[idx]}><Icon/>{routeText}</Link></NavigationMenuLink>
                                    )
                                })}
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenu>
        </header>
    )
}