import { useState } from "react"
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Disc3, Search } from "lucide-react"
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from "@/components/ui/tooltip"
import {
   Dialog,
   DialogTrigger
} from "@/components/ui/dialog"

import ViewTracks from "@/components/main-content/search-results/item-result/view-tracks"

export default function ItemResult({ item }: { item: any }) {
   const [results, setResults] = useState<any[]>([])
   const [error, setError] = useState("")

   const handleViewTracks = async() => {
      let res
      setError("")
      
      try {
         res = await fetch(`/tracks/searchTracksByItem?q=${encodeURIComponent(item.ItemID)}`)
         
         if (!res.ok) {
            throw new Error("Fetch Failed")
         }

         const data = await res.json()
         setResults(data)
      }

      catch (err) {
         console.error(err)
         setError("Error Encountered In Call To thedungeon0000 API, Please Try Again Later")
      }
   }
      
   return (
      <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition cursor-pointer">
         <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
               {item.ItemCoverImage !== null ?
                  <img src={`/covers/${item.ItemCoverImage}`} alt={`${item.ItemName} cover`} className="w-25 h-25 rounded-lg drop-shadow-lg"/>
               :
                  <Disc3 className="w-10 h-10 bg-accent rounded-lg p-1 text-muted-foreground" />
               }
               <div className="rounded-lg absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-muted-foreground bg-fixed opacity-0 transition duration-200 ease-in-out hover:opacity-65 flex items-center justify-center">
                  <Tooltip>
                     <Dialog>
                           <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                              <Search className="w-15 h-15 cursor-pointer" onClick={handleViewTracks}/>
                        </DialogTrigger>
                           </TooltipTrigger>
                        <ViewTracks item={item} results={results} error={error}/>
                     </Dialog>
                     <TooltipContent>
                        View Tracks
                     </TooltipContent>
                  </Tooltip>
               </div>
            </div>

            <div className="flex flex-col flex-1 min-w-0">
               <p className="font-bold leading-tight">{item.ItemName}</p>
               <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Artist:</span> {item.ItemArtists}</p>
               <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Label:</span> {item.ItemLabel}</p>
               <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Release Date:</span> {item.ItemReleaseMonth}/{item.ItemReleaseDay}/{item.ItemReleaseYear}</p>
               <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Track Count:</span> {item.ItemTrackCount}</p>
            </div>
         </div>
         <div className="text-lg font-bold drop-shadow-lg">
            <p className="text-lg font-bold rounded-lg p-1 bg-accent">{item.ItemFormat}</p>
         </div>
      </div>
   )
}