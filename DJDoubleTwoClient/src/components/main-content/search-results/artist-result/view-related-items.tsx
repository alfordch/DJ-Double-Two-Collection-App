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

import ItemResult from "@/components/main-content/search-results/item-result/items-result"

export default function ViewRelatedItems({ artist, results, error }: { artist: any, results: any, error: any}) {
    return (
        <div>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Related Items:</DialogTitle>
                    
                    <DialogDescription>
                        <span className="font-style: italic font-bold">{artist.ArtistName}</span>
                    </DialogDescription>
                    
                    <Separator orientation="horizontal"/>

                    <ScrollArea className={`${results.length > 2 && 'h-100'} p-4`}>
                        {!error ? <span>{results.length !== 0 &&
                            results.map((item: any, idx: any) => (
                                <div key={idx} className="mb-2">
                                    <ItemResult item={item} key={idx}/>
                                </div>
                            ))
                        }</span> : <div className="bg-muted p-3 rounded-md"><p className="text-red-500">{error}</p></div> }

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