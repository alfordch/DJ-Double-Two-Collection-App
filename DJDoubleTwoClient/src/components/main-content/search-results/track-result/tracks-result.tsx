import { useGlobalAppState } from "@/app-context/app-context"
import { Music, Plus } from "lucide-react"
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip"
import {
   Dialog,
   DialogTrigger
} from "@/components/ui/dialog"

import AddToSelectionContent from "@/components/main-content/search-results/track-result/add-to-selection"

export default function TrackResult({ track }: { track: any }) {
   const { userLoggedIn } = useGlobalAppState()

   return (
      <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition">
         <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
               {/* Check for db track that does not have an image */}
               {track.ItemCoverImage !== null ?
                  <img src={`/covers/${track.ItemCoverImage}`} alt={`${track.ItemName} cover`} className="w-25 h-25 rounded-lg drop-shadow-lg"/>
               :
                  <Music className="w-10 h-10 bg-accent rounded-lg p-1 text-muted-foreground cursor-pointer" />
               }

               {/* Load overlay for adding track to selection if user is logged in */}
               {userLoggedIn.userLoggedIn && (
                  <div className="rounded-lg absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-muted-foreground bg-fixed opacity-0 transition duration-200 ease-in-out hover:opacity-65 flex items-center justify-center">
                     <Tooltip>
                        <Dialog>
                           <DialogTrigger>
                              <TooltipTrigger asChild>
                                 <Plus className={`w-15 h-15 ${userLoggedIn.userLoggedIn && 'cursor-pointer'}`}/>
                              </TooltipTrigger>
                           </DialogTrigger>
                           <AddToSelectionContent track={track}/>
                        </Dialog>
                        <TooltipContent>
                           Add to selection
                        </TooltipContent>
                     </Tooltip>
                  </div>
               )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
               <p className="font-bold leading-tight">{track.TrackName}</p>
               <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Artist:</span> {track.TrackArtists}</p>
               <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Item:</span> {track.ItemName} ({track.ItemLabel}) [{track.ItemReleaseYear}] | {track.TrackItemLoc}</p>
               {track.TrackFeatures && <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Featuring:</span> {track.TrackFeatures}</p>}
               <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Produced By:</span> {track.TrackProducers}</p>
            </div>
         </div>
         <div className="text-lg font-bold drop-shadow-lg ml-1">
            <p className="text-lg font-bold rounded-lg p-1 bg-accent">{track.TrackLength}</p>
         </div>
      </div>
   )
}