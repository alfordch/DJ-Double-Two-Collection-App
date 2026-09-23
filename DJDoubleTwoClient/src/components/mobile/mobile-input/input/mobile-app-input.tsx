import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shuffle } from "lucide-react"
import { Plus } from "lucide-react"

export function MobileAppInput({
      placeholder = "Search...",
      buttonLabel = "Search",
      onSubmit,
   }: {
      placeholder?: string
      buttonLabel?: string
      onSubmit?: (value: string) => void
   }) {

   const [value, setValue] = useState("")
   const location = useLocation();

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (onSubmit) onSubmit(value)
   }

   return (
      <form onSubmit={handleSubmit} className="flex max-w-sm items-center gap-2">
         <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            id="appInput"
         />
         <Button type="button" variant="outline" onClick={() => { if (onSubmit) onSubmit("__shuffle__")}}>
            <Shuffle/>
         </Button>
      </form>
   )
}
