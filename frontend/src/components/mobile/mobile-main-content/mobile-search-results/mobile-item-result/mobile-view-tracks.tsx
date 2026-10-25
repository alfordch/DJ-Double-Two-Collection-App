import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
   Dialog,
   DialogTrigger,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

import MobileViewTracksTable from "@/components/mobile/mobile-main-content/mobile-search-results/mobile-item-result/mobile-view-tracks-table"
import MobileItemGraphicsViewer from "@/components/mobile/mobile-main-content/mobile-search-results/mobile-item-result/mobile-image-graphics-viewer"

export default function MobileViewTracks({ item, results, realReleaseDate, error, renderDialogContent = true }: { item: any, results: any, realReleaseDate: boolean, error: any, renderDialogContent: boolean}) {
   const [imgError, setImgError] = useState(false)
   var imgSrc = `/webGraphics/${item.ItemID}/graphics/Cover.webp`

   // List of Items by ID that have multiple cover images
   const specialGraphicsList = [30414578, 35783428]

   if (specialGraphicsList.includes(item.ItemID)) {
      imgSrc = `/webGraphics/${item.ItemID}/graphics/Cover_1.webp`
   }

   const mobileViewTracksContent = (
      <>
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
                              <div className="w-55 h-55 cursor-pointer flex items-center justify-center">
                                 <Search className="w-15 h-15 cursor-pointer" />
                              </div>
                           </DialogTrigger>
                           <DialogContent className="w-[85vw] !max-w-4xl" showCloseButton={true}>
                              <DialogTitle asChild>
                                 <VisuallyHidden>Hidden dialog title</VisuallyHidden>
                              </DialogTitle>
                              <DialogDescription asChild>
                                 <VisuallyHidden>Hidden dialog description</VisuallyHidden>
                              </DialogDescription>
                              <MobileItemGraphicsViewer item={item}/>
                           </DialogContent>
                        </Dialog>
                     </div>
                  }
               </div>
               
               <div className="flex flex-col items-center flex-shrink-0 gap-0 text-center">
                  <p className="font-bold leading-tight text-xl">{item.ItemName}</p>
                  <p className="text-lg">{item.ItemArtists}</p>
                  <p className="text-sm">{item.ItemLabel} · {realReleaseDate ? <span>{item.ItemReleaseMonth}/{item.ItemReleaseDay}/{item.ItemReleaseYear}</span> : <span>{item.ItemReleaseYear}</span>}</p>
                  <p className="text-sm">{item.ItemTrackCount} tracks</p>
               </div>
               
               <div className="flex-shrink-0 drop-shadow-lg">
                  <p className="text-sm font-bold rounded-lg p-1 bg-accent">{item.ItemFormat}</p>
               </div>

               <Separator orientation="horizontal" className="mt-2 mb-2 w-full flex-shrink-0"/>
               
               <ScrollArea className="h-fit max-h-[28dvh] w-full">
                  <MobileViewTracksTable results={results} itemArtist={item.ItemArtists}/>
               </ScrollArea>
            </div>
         </DialogHeader>
      </>
   )

   if (!renderDialogContent) {
      return mobileViewTracksContent
   }

   return (
      <DialogContent showCloseButton={true} className="flex max-h-[80dvh] w-[90vw] max-w-4xl flex-col overflow-hidden" >
         {mobileViewTracksContent}
      </DialogContent>
   )

}