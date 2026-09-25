import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
   Dialog,
   DialogTrigger,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

import MobileViewTracksTable from "@/components/mobile/mobile-main-content/mobile-search-results/mobile-item-result/mobile-view-tracks-table"
import ItemGraphicsViewer from "@/components/desktop/main-content/search-results/item-result/image-graphics-viewer"

export default function MobileViewTracks({ item, results, realReleaseDate, error }: { item: any, results: any, realReleaseDate: boolean, error: any}) {
   const [imgError, setImgError] = useState(false)
   var imgSrc = `/webGraphics/${item.ItemID}/graphics/Cover.webp`

   // List of graphics by ID that have multiple cover images
   const specialGraphicsList = [30414578, 35783428]
   if (specialGraphicsList.includes(item.ItemID)) {
      imgSrc = `/webGraphics/${item.ItemID}/graphics/Cover_1.webp`
   }

   return (
      <div>
         <DialogContent showCloseButton={true} className="w-[90vw] max-w-4xl">
            {/* Fix radix error with dialog title */}
            <DialogTitle asChild>
               <VisuallyHidden>Hidden dialog title</VisuallyHidden>
            </DialogTitle>
            <DialogHeader className="flex min-h-0 w-full flex-1 flex-col">
               {/* Fix radix error with dialog description */}
               <DialogDescription asChild>
                  <VisuallyHidden>Hidden dialog description</VisuallyHidden>
               </DialogDescription>
               <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-2">
                  <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
                     {!imgError ? 
                        <img src={imgSrc} alt={`${item.ItemName} cover`} onError={() => setImgError(true)} className="w-55 h-55 rounded-lg drop-shadow-lg border-3 border-black"/>
                     :
                        <img src={`/fallbackGraphics/${item.ItemCoverImage}`} alt={`${item.ItemName} cover`} onError={() => setImgError(true)} className="w-45 h-45 rounded-lg drop-shadow-lg border-3 border-black"/>
                     }

                     {!imgError &&
                        <div className="rounded-lg absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-muted-foreground bg-fixed opacity-0 transition duration-200 ease-in-out hover:opacity-65 flex items-center justify-center">
                           <Dialog>
                              <DialogTrigger>
                                    <Search className="w-15 h-15 cursor-pointer" />
                              </DialogTrigger>
                              <DialogContent className="w-3/4 !max-w-4xl" showCloseButton={true}>
                                    <DialogTitle asChild>
                                    <VisuallyHidden>Hidden dialog title</VisuallyHidden>
                                 </DialogTitle>
                                 <DialogDescription asChild>
                                    <VisuallyHidden>Hidden dialog description</VisuallyHidden>
                                 </DialogDescription>
                                 <ItemGraphicsViewer item={item}/>
                              </DialogContent>
                           </Dialog>
                        </div>
                     }
                  </div>
                  
                  <div className="flex flex-col items-center flex-shrink-0 gap-0">
                     <p className="font-bold leading-tight text-xl">{item.ItemName}</p>
                     <p className="text-lg">{item.ItemArtists}</p>
                     <p>{item.ItemLabel} · {realReleaseDate ? <span>{item.ItemReleaseMonth}/{item.ItemReleaseDay}/{item.ItemReleaseYear}</span> : <span>{item.ItemReleaseYear}</span>}</p>
                     <p className="text-sm">{item.ItemTrackCount} tracks</p>
                  </div>
                  
                  <div className="flex-shrink-0 drop-shadow-lg">
                        <p className="text-md font-bold rounded-lg p-1 bg-accent">{item.ItemFormat}</p>
                  </div>

                  <Separator orientation="horizontal" className="mt-3 mb-2 w-full flex-shrink-0"/>
                  
                  <ScrollArea className="w-full flex-1 max-h-[40vh]">
                     <div className="">
                           <MobileViewTracksTable results={results} itemArtist={item.ItemArtists}/>
                     </div>
                  </ScrollArea>
               </div>
            </DialogHeader>
         </DialogContent>
      </div>
   )
}