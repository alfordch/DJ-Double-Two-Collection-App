import { ModeToggle } from '@/components/theme/mode-toggle'
import { useState, useEffect } from 'react'

export function MobileHeader({ path } : { path: string }) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            const top = window.scrollY === 0
            setShow(top)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div className={`drop-shadow-md overflow-hidden transition-all duration-400 ease-in-out ${show ? 'h-[72px] opacity-100 translate-y-0' : 'h-0 opacity-0 -translate-y-full'}`}>
            <div className="p-5 flex items-center justify-between bg-accent">
                <div className="flex items-center gap-2">
                    <a href="#/">
                        <img src="/DJDoubleTwo_IV_Logo.png" className="size-10 rounded-md"></img>
                    </a>
                    <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-medium">DJ Double Two</span>
                        <span>Media Collection</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle/>
                </div>
            </div>
        </div>
    )
}