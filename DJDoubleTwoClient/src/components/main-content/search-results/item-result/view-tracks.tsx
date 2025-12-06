import { Button } from "@/components/ui/button"
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

import ViewTracksTable from "@/components/main-content/search-results/item-result/view-tracks-table"

export default function ViewTracks({ item, results, error }: { item: any, results: any, error: any}) {
   return (
      <div>
         <DialogContent showCloseButton={false} className="w-3/4 !max-w-4xl">
            {/* Fix radix error with dialog title */}
            <DialogTitle asChild>
               <VisuallyHidden>Hidden dialog title</VisuallyHidden>
            </DialogTitle>
            <DialogHeader>
               {/* Fix radix error with dialog description */}
               <DialogDescription asChild>
                  <VisuallyHidden>Hidden dialog description</VisuallyHidden>
               </DialogDescription>
               <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
                        <img src={`/covers/${item.ItemCoverImage}`} alt={`${item.ItemName} cover`} className="w-45 h-45 rounded-lg drop-shadow-lg"/>
                        <div className="rounded-lg absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-muted-foreground bg-fixed opacity-0 transition duration-200 ease-in-out hover:opacity-65 flex items-center justify-center">
                           <Dialog>
                              <DialogTrigger>
                                    <Search className="w-15 h-15 cursor-pointer" />
                              </DialogTrigger>
                           </Dialog>
                        </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                        <p className="font-bold leading-tight text-xl">{item.ItemName}</p>
                        <p className="text-lg">{item.ItemArtists}</p>
                        <p>{item.ItemLabel} · {item.ItemReleaseMonth}/{item.ItemReleaseDay}/{item.ItemReleaseYear}</p>
                        <p className="text-sm">{item.ItemTrackCount} tracks</p>
                  </div>
                  <div className="text-lg font-bold drop-shadow-lg">
                        <p className="text-lg font-bold rounded-lg p-1 bg-accent">{item.ItemFormat}</p>
                  </div>
               </div>
               <Separator orientation="horizontal" className="mt-3 mb-2"/>
               <ScrollArea className={`${results.length > 10 && 'h-100'}`}>
                  <div className={`${results.length > 10 && "pr-3"}`}>
                        <ViewTracksTable results={results} itemArtist={item.ItemArtists}></ViewTracksTable>
                  </div>
               </ScrollArea>
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