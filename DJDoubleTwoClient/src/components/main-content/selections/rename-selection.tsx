import { useState } from "react"
import {
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function RenameSelectionResult({ selection, onRefresh }: { selection: any, onRefresh: any }) {
   const [error, setError] = useState("")
   const [newName, setNewName] = useState("")

   const handleRename = async() => {
      try {
         let res
         const body: any = { 
            selectionID: selection.selectionID,
            selectionUser: selection.selectionUser,
            newSelectionName: newName
         }
         res = await fetch('/selections/renameSelection', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
         })
         if(!res.ok) {
            throw new Error("Rename Selection Failed")
         }
         const data = await res.json()
      }
      catch (err) {
         setError("Error Encountered In Call To thedungeon0000 API, Please Try Again")
      }
      onRefresh()
   }

   return (
      <DialogContent showCloseButton={false}>
         <DialogHeader>
            <DialogTitle>Rename Selection:</DialogTitle>
            <DialogDescription>
               Provide a new name for this selection: <span className="font-bold">{selection.selectionName}</span>
            </DialogDescription>
            <Separator orientation="horizontal"/>
         </DialogHeader>
         <FieldGroup className="pb-3">
            <Field>
              <FieldLabel htmlFor="filename">New Name</FieldLabel>
              <Input id="filename" name="text" placeholder="Super Cool Mix #123" value={newName} onChange={(e) => setNewName(e.target.value)}  />
            </Field>
          </FieldGroup>
         <DialogFooter>
            <DialogClose asChild>
               <Button className="cursor-pointer" onClick={handleRename}>Rename</Button>
            </DialogClose>
            <DialogClose asChild>
               <Button variant="outline" className="cursor-pointer">Close</Button>
            </DialogClose>
         </DialogFooter>
      </DialogContent>
   )
}