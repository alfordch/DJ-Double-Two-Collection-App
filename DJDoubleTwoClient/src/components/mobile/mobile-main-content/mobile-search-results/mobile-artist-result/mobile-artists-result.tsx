import { MicVocal } from "lucide-react"
import { useState } from "react"
import {
   Dialog,
   DialogTrigger
} from "@/components/ui/dialog"

import MobileViewRelatedItems from "@/components/mobile/mobile-main-content/mobile-search-results/mobile-artist-result/mobile-view-related-items"

export default function MobileArtistResult({ artist }: { artist: any }) {
   const [results, setResults] = useState<any[]>([])
   const [error, setError] = useState("")

   const handleViewRelatedItems = async() => {
      let res
      setError("")

      try {
         res = await fetch(`/items/searchItemsByArtist?q=${encodeURIComponent(artist.ArtistID)}`)

         if (!res.ok) {
            throw new Error("Fetch relatedItems Failed")
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
            <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition cursor-pointer" onClick={handleViewRelatedItems}>
               <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
                     {(artist.ArtistImage !== null && artist.ArtistImage !== 'None') ?
                        <img src={`/artistImages/${artist.ArtistImage}`} alt={`${artist.ArtistName} image`} className="w-20 h-20 rounded-lg drop-shadow-lg object-cover"/>
                     :
                        <MicVocal className="w-20 h-20 bg-accent rounded-lg p-1 text-muted-foreground drop-shadow-lg" />
                     }
                  </div>
                  
                  <div className="flex flex-col flex-1 min-w-0">
                     <p className="font-bold leading-tight">{artist.ArtistName}</p>

                     <p className="font-bold text-muted-foreground">{artist.ArtistHometown}</p>
                     
                     {artist.GroupMemberships && 
                           <p className="text-xs text-muted-foreground leading-tight">
                              {/* <span className="font-bold">In Group{artist.GroupCount > 1 && 
                                 <span className="font-bold">s</span>}:
                              </span> */} {artist.GroupMemberships}
                           </p>
                     }
                     {/* {artist.ItemCount > 0 && 
                        <p className="text-sm text-muted-foreground leading-tight">
                           <span className="font-bold">
                              Collection Item{artist.ItemCount > 1 &&
                              <span className="font-bold">s</span>}:
                           </span> {artist.ItemCount}
                        </p>
                     } */}
                  </div>
               </div>
            </div>
         </DialogTrigger>
         <MobileViewRelatedItems artist={artist} results={results} error={error}/>
      </Dialog>
   )
}