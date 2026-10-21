import { ModeToggle } from '@/components/theme/mode-toggle'
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function MainHeader({ headertext = "..."}) {
    return(
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle />
            <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-medium">{ headertext }</h1>

        </header>
    )
}