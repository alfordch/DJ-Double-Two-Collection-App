import { useState } from "react"
import { AppInput } from "@/components/input/app-input"
import { MainHeader } from "@/components/main-header"
import { Separator } from "@/components/ui/separator"

export default function Selections() {
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