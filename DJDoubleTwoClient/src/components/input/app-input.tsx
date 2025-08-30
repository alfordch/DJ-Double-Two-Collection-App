import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shuffle } from "lucide-react"

export function AppInput({
  placeholder = "Search...",
  buttonLabel = "Search",
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
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        id="appInput"
      />
      <Button type="submit" variant="outline">
        {buttonLabel}
      </Button>
      <Button type="button" variant="outline" onClick={() => { if (onSubmit) onSubmit("__shuffle__")}}>
        <Shuffle/>
      </Button>
    </form>
  )
}
