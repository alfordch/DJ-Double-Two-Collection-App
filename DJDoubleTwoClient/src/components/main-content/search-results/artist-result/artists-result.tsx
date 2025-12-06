import { MicVocal } from "lucide-react"
import { useState } from "react"
import {
   Dialog,
   DialogTrigger
} from "@/components/ui/dialog"

import ViewRelatedItems from "@/components/main-content/search-results/artist-result/view-related-items"

export default function ArtistResult({ artist }: { artist: any }) {
   const [results, setResults] = useState<any[]>([])
   const [error, setError] = useState("")

   const handleViewRelatedItems = async() => {
      let res
      setError("")

      try {
         res = await fetch(`/items/searchItemsByArtist?q=${encodeURIComponent(artist.ArtistID)}`)

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
            <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition cursor-pointer" onClick={handleViewRelatedItems}>
               <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
                     {(artist.ArtistImage !== null && artist.ArtistImage !== 'None') ?
                        <img src={`/artistImages/${artist.ArtistImage}`} alt={`${artist.ArtistName} image`} className="w-25 h-25 rounded-lg drop-shadow-lg object-cover"/>
                     :
                        <MicVocal className="w-25 h-25 bg-accent rounded-lg p-1 text-muted-foreground drop-shadow-lg" />
                     }
                     {/* <div className="rounded-lg absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-muted-foreground bg-fixed opacity-0 transition duration-200 ease-in-out hover:opacity-65 flex items-center justify-center">
                        <Search className="w-15 h-15 cursor-pointer" onClick={handleViewRelatedItems}/>
                     </div> */}
                  </div>
                  
                  <div className="flex flex-col flex-1 min-w-0">
                     <p className="font-bold leading-tight">{artist.ArtistName}</p>
                     {artist.GroupMemberships && 
                           <p className="text-sm text-muted-foreground leading-tight">
                              <span className="font-bold">In Group{artist.GroupCount > 1 && 
                                 <span className="font-bold">s</span>}:
                              </span> {artist.GroupMemberships}
                           </p>
                     }
                     {artist.ItemCount > 0 && 
                        <p className="text-sm text-muted-foreground leading-tight">
                           <span className="font-bold">
                              Collection Item{artist.ItemCount > 1 &&
                              <span className="font-bold">s</span>}:
                           </span> {artist.ItemCount}
                        </p>
                     }
                  </div>
               </div>
               <div className="text-lg font-bold drop-shadow-lg">
                  <p className="text-lg font-bold rounded-lg p-1 bg-accent">{artist.ArtistHometown}</p>
               </div>
            </div>
         </DialogTrigger>
         <ViewRelatedItems artist={artist} results={results} error={error}/>
      </Dialog>
   )
}