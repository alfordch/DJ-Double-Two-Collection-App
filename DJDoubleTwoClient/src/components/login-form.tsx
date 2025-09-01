import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { React } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints"
import { ArrowLeft } from "lucide-react"

const data = {
   loginItems: {
      headerText: "Welcome Back",
      buttonText: "Login",
      bottomText: "Don't have an account? ",
      redirectText: "Sign up",
   },
   signUpItems: {
      headerText: "Create An Account",
      buttonText: "Sign Up",
      bottomText: "Already have an account? ",
      redirectText: "Login",
   }
}

export function LoginForm({setLoginState, className,...props}: any) {
   const navigate = useNavigate()

   /* true == Login, false == signUp */
   const [login, setLogin] = useState(true)
   const [userName, setUserName] = useState("")
   const [displayName, setDisplayName] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")

   const handleSubmit = async (e: React.FormEvent) => {
      localStorage.clear()
      e.preventDefault()
      setError("")

      try {
      const endpoint = login ? "/users/userLogin" : "/users/userSignUp"
      const body: any = {userName, password }

      if (!login) {
         body.displayName = displayName
      }

      const res = await fetch(`http://192.168.5.100:3000${endpoint}`, {
         method: "POST",
         headers: { "Content-Type": "application/json"},
         body: JSON.stringify(body)
      })

      const data = await res.json()

      if (!res.ok) {
         setError(data.error || "Something went wrong")
         return
      }
      else {
         /* console.log("Success: ", data) */
         localStorage.setItem('user', data.token)
         localStorage.setItem('displayName', data.user.displayName)
         localStorage.setItem('userName', data.user.userName)
         {setLoginState(true)}
         navigate("/")
      }
      }
      catch(err) {
      /* console.error(err) */
      setError("Error when logging in. Please try again")
      }
   }

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card>
            <CardHeader className="text-center">
               <CardTitle className="text-xl">
               <div className="flex justify-between items-center">
                  <a href="#/">
                     <ArrowLeft />
                  </a>
                  {login ? data.loginItems.headerText : data.signUpItems.headerText}
                  <div className="w-[24px]"></div>
               </div>
               </CardTitle>
            </CardHeader>
            <CardContent>
               <form>
               <div className="grid gap-6">
                  <div className="grid gap-6">
                     
                     <div className="grid gap-3">
                     <Label htmlFor="userName">Username</Label>
                     <Input
                        id="userName"
                        type="user"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        autoComplete="off"
                        required
                     />
                     </div>
                     
                     {!login &&
                     <div className="grid gap-3">
                     <div className="flex items-center">
                        <Label htmlFor="displayName">Display Name</Label>
                     </div>
                     <Input 
                        id="displayName"
                        type="user"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                     />
                     </div>
                     }

                     <div className="grid gap-3">
                     <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                     </div>
                     <Input 
                        id="password"
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                     />
                     </div>
                     
                     <Button type="submit" className="w-full cursor-pointer" onClick={handleSubmit}>
                        {login ? data.loginItems.buttonText : data.signUpItems.buttonText}
                     </Button>
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  {/* Redirect to signup or login */}
                  <div className="text-center text-sm">
                     {login ? data.loginItems.bottomText : data.signUpItems.bottomText}
                     <span className="underline underline-offset-4 cursor-pointer" onClick={()=>{setLogin(!login)}}>
                     {login ? data.loginItems.redirectText : data.signUpItems.redirectText} 
                     </span>
                  </div>

               </div>
               </form>
            </CardContent>
         </Card>
      </div>
   )
}
