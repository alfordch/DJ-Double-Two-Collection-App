import { Button } from "@/components/ui/button"
import { useState } from "react"
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

export default function ViewTracks({ item, results }: { item: any, results: any}) {
    return (
        <div>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Tracks:</DialogTitle>
                    
                    <DialogDescription>
                        <span className="font-style: italic font-bold">{item.ItemName} by {item.ItemArtists} [{item.ItemLabel}, {item.ItemReleaseYear}]</span>
                    </DialogDescription>
                    
                    <Separator orientation="horizontal"/>

                    <ScrollArea className={`${results.length > 2 && 'h-100'} p-4`}>
                        {results.length !== 0 &&
                            results.map((track: any, idx: any) => (
                                <div key={idx} className="mb-2">
                                    <TrackResult track={track} key={idx}/>
                                </div>
                            ))
                        }

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