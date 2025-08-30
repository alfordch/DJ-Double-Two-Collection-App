import { useState } from 'react'
import { LoginForm } from './login-form'
import { ModeToggle } from '@/components/theme/mode-toggle'

export default function LoginPage({ setLoginState }: any) {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#/" className="flex items-center gap-2 self-center font-medium">
                    <div className="text-primary-foreground flex items-center justify-center rounded-md">
                        <img src="/DJDoubleTwo_IV_Logo.png" className="rounded-md h-8 w-8"/>
                    </div>
                    djdoubletwo.net
                </a>
                <LoginForm setLoginState = { setLoginState }/>
            </div>
        </div>
    )
}