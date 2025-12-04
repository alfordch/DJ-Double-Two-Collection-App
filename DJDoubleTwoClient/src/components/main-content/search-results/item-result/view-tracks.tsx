import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import TrackResult from "@/components/main-content/search-results/track-result/tracks-result"
import ViewTracksTable from "@/components/main-content/search-results/item-result/view-tracks-table"

export default function ViewTracks({ item, results, error }: { item: any, results: any, error: any}) {
    return (
        <div>
            <DialogContent showCloseButton={false} className="w-3/4 !max-w-4xl">
                <DialogHeader>
                    {/* <DialogTitle>Tracks:</DialogTitle> */}
                    
                    {/* <DialogDescription>
                        <span className="font-style: italic font-bold">{item.ItemName} by {item.ItemArtists} [{item.ItemLabel}, {item.ItemReleaseYear}]</span>
                    </DialogDescription> */}

                    <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
                            <img src={`/covers/${item.ItemCoverImage}`} alt={`${item.ItemName} cover`} className="w-45 h-45 rounded-lg drop-shadow-lg"/>
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
                    
                    <ScrollArea className={`${results.length > 2 && 'h-50'}`}>
                    
                        <ViewTracksTable results={results}></ViewTracksTable>

                        <ScrollBar className="cursor-pointer"/>
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