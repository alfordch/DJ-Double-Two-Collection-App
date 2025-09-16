import SelectionResult from "@/components/main-content/search-results/selection-result"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"

// test selections for getting pagination and selection results going
const testSelections = {
   list: [
      {selectionName: 'test selection 1', added: true},
      {selectionName: 'test selection 2'},
      {selectionName: 'test selection 3'},
      {selectionName: 'test selection 4'},
   ],
}

export default function AddToSelectionContent({ track }: { track: any }) {
   return (
      <div>
         <DialogContent showCloseButton={false}>
            <DialogHeader>
               <DialogTitle>Add this track to one of my selections:</DialogTitle>
               
               <DialogDescription>
                  <span className="font-style: italic font-bold">{track.TrackName} by {track.TrackArtists} ({track.ItemName} [{track.ItemReleaseYear}])</span>
               </DialogDescription>
               
               <Separator orientation="horizontal"/>
               
               <DialogDescription>
                  Pick which selection to add the track to:
               </DialogDescription>

               {testSelections.list.map((selection: any, idx: any) => (
                  <div key={idx}>
                     <SelectionResult selection={selection} />
                  </div>
               ))}

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