import { Button } from "@/components/ui/button"
import { ListMusic } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddToSelectionContent({ track }: { track: any }) {
   return (
      <div>
         <DialogContent showCloseButton={false}>
            <DialogHeader>
               <DialogTitle>Add track to my selections:</DialogTitle>
               
               <DialogDescription>
                  <span className="font-style: italic font-bold">{track.TrackName} by {track.TrackArtists} ({track.ItemName} [{track.ItemReleaseYear}])</span>
               </DialogDescription>
               
               <Separator orientation="horizontal"/>
               
               <DialogDescription>
                  Pick which selection to add the track to:
               </DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">Close</Button>
               </DialogClose>
            </DialogFooter>
         </DialogContent>
      </div>
   )
}