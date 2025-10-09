import { useState } from "react"
import { AppInput } from "@/components/input/app-input"
import { MainHeader } from "@/components/main-header"
import { Separator } from "@/components/ui/separator"
import { useGlobalAppState, globalAppInterface } from "@/app-context/app-context"

export default function Selections() {
    const { userLoggedIn } = useGlobalAppState()

    return (
        <div className="flex flex-col px-4">
            <div className="flex items-center">
                <MainHeader headertext="My Selections" />
                {/* <AppInput placeholder="Artists..." buttonLabel="Search" /> */}
                
            </div>
            <Separator orientation="horizontal" className="w-full mb-4" />
        </div>
    )
}