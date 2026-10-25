import { useState } from "react"
import {
   Dialog,
   DialogTrigger
} from "@/components/ui/dialog"

import MobileTrackInfo from "@/components/mobile/mobile-main-content/mobile-search-results/mobile-track-result/mobile-track-info"

export default function MobileTrackResult({ track }: { track: any }) {
   const [imgError, setImgError] = useState(false)

   return (
      <Dialog>
         <DialogTrigger asChild>
         <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition cursor-pointer">
            <div className="flex items-center gap-3">
               <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
                  {!imgError ? 
                     <img src={`/webGraphics/${track.TrackItem}/${track.TrackItem}.webp`} alt={`${track.ItemName} cover`} onError={() => setImgError(true)} className="w-25 h-25 rounded-lg drop-shadow-lg border-3 border-black"/>
                  :
                     <img src={`/fallbackGraphics/${track.ItemCoverImage}`} alt={`${track.ItemName} cover`} onError={() => setImgError(true)} className="w-25 h-25 rounded-lg drop-shadow-lg border-3 border-black"/>
                  }
               </div>
               <div className="flex flex-col flex-1 min-w-0 break-words" style={{minWidth: 0, overflowWrap: "anywhere", wordBreak: "normal"}}>
                  <p className="font-bold leading-tight">{track.TrackName}</p>
                  <p className="text-sm text-muted-foreground leading-tight font-bold">{track.TrackArtists}</p>
                  <p className="text-sm italic text-foreground leading-tight">{track.ItemName}</p>
                  <p className="text-sm text-muted-foreground leading-tight">{track.ItemReleaseYear}</p>
               </div>
            </div>
            <div className="font-bold drop-shadow-lg ml-1">
               <p className="font-bold rounded-lg p-1 bg-accent">{track.TrackLength}</p>
            </div>
         </div>
         </DialogTrigger>
         <MobileTrackInfo track={track}/>
      </Dialog>
   )
}