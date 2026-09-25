import { useState } from "react"
import { Disc3 } from "lucide-react"
import {
   Dialog,
   DialogTrigger
} from "@/components/ui/dialog"

import MobileViewTracks from "@/components/mobile/mobile-main-content/mobile-search-results/mobile-item-result/mobile-view-tracks"

export default function MobileItemResult({ item }: { item: any }) {
   const [results, setResults] = useState<any[]>([])
   const [error, setError] = useState("")
   const [imgError, setImgError] = useState(false)
   var realReleaseDate = true
   var format = '1'

   if (item.ItemReleaseMonth === 1 && item.ItemReleaseDay === 1) {
      realReleaseDate = false
   }

   switch(item.ItemFormat) {
      case '12" Single':
         format = '12"'
         break
      case '7" Single':
         format = '7"'
         break
      case 'LP + 7"':
         format = 'LP+7"'
         break
      default:
         format = item.ItemFormat
         break
   }

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
      <Dialog>
         <DialogTrigger asChild>
            <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition cursor-pointer" onClick={handleViewTracks}>
               <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
                     {!imgError ? (
                        <img src={`/webGraphics/${item.ItemID}/${item.ItemID}.webp`} alt={`${item.ItemName} cover`} onError={() => setImgError(true)} className="w-25 h-25 rounded-lg drop-shadow-lg border-3 border-black"/>
                     ) : (
                        <img src={`/fallbackGraphics/${item.ItemCoverImage}`} alt={`${item.ItemName} cover`} onError={() => setImgError(true)} className="w-25 h-25 rounded-lg drop-shadow-lg border-3 border-black"/>
                     )}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                     <p className="font-bold leading-tight">{item.ItemName}</p>
                     <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Artist:</span> {item.ItemArtists}</p>
                     <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Label:</span> {item.ItemLabel}</p>
                     <p className="text-sm text-muted-foreground leading-tight">
                        {realReleaseDate ?
                           <span><span className="font-bold">Release Date:</span> {item.ItemReleaseMonth}/{item.ItemReleaseDay}/{item.ItemReleaseYear}</span>
                           :
                           <span><span className="font-bold">Release Year:</span> {item.ItemReleaseYear}</span>
                        }
                     </p>
                     <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Track Count:</span> {item.ItemTrackCount}</p>
                  </div>
               </div>
               <div className="font-bold drop-shadow-lg">
                  <p className="font-bold rounded-lg p-1 bg-accent">{format}</p>
               </div>
            </div>
         </DialogTrigger>
         <MobileViewTracks item={item} results={results} realReleaseDate={realReleaseDate} error={error}/>
      </Dialog>
   )
}