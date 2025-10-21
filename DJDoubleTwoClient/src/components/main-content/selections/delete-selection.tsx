import { useState } from "react"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function DeleteSelectionResult({ selection }: { selection: any }) {
    const [error, setError] = useState("")

    const handleDelete = async() => {
        try {
            let res
            const body: any = { 
                selectionID: selection.selectionID,
                selectionUser: selection.selectionUser
            }
            
            res = await fetch('/selections/deleteSelection', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            if(!res.ok) {
            throw new Error("Delete Selection Failed")
            }

            const data = await res.json()
        }
        catch (err) {
            setError("Error Encountered In Call To thedungeon0000 API, Please Try Again")
        }
   }
    return (
        <DialogContent showCloseButton={false}>
            <DialogHeader>
                <DialogTitle>Confirm Selection Deletion:</DialogTitle>
                
                <DialogDescription>
                    Are you sure you want to delete this selection: <span className="font-bold">{selection.selectionName}</span>
                </DialogDescription>
                
                <Separator orientation="horizontal"/>

            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="destructive" className="cursor-pointer" onClick={handleDelete}>Delete</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}