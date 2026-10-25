import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shuffle } from "lucide-react"

export function MobileAppInput({
      placeholder = "Search...",
      onSubmit,
   }: {
      placeholder?: string
      buttonLabel?: string
      onSubmit?: (value: string) => void
   }) {

   const [value, setValue] = useState("")

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (onSubmit) onSubmit(value)
   }

   return (
      <form onSubmit={handleSubmit} className="flex items-center gap-1 pl-2">
         <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            id="appInput"
            className='min-w-0 flex-1'
         />
         <Button className='shrink-0' type="button" variant="outline" onClick={() => { if (onSubmit) onSubmit("__shuffle__")}}>
            <Shuffle/>
         </Button>
      </form>
   )
}
