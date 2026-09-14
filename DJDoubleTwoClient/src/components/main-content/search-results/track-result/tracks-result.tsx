import { useState } from "react"

export default function TrackResult({ track }: { track: any }) {
   const [imgError, setImgError] = useState(false)

   return (
      <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition">
         <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
               {!imgError ? 
                  <img src={`/webGraphics/${track.TrackItem}/${track.TrackItem}.webp`} alt={`${track.ItemName} cover`} onError={() => setImgError(true)} className="w-25 h-25 rounded-lg drop-shadow-lg border-3 border-black"/>
               :
                  <img src={`/fallbackGraphics/${track.ItemCoverImage}`} alt={`${track.ItemName} cover`} onError={() => setImgError(true)} className="w-25 h-25 rounded-lg drop-shadow-lg border-3 border-black"/>
               }
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