import { ModeToggle } from '@/components/theme/mode-toggle'
import { useState, useEffect, startTransition } from 'react'

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
    }, []);



    return (
            <div className={`p-5 flex items-center justify-between bg-accent drop-shadow-md transition-all duration-300 ease-in-out ${show ? 'translate-y-0 opacity-100' : 'absolute -top-40 opacity-0'}`}>
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
    )
}