import { Separator } from "@/components/ui/separator"
import {
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

import MobileItemResult from "@/components/mobile/mobile-main-content/mobile-search-results/mobile-item-result/mobile-items-result"

export default function MobileViewRelatedItems({ artist, results, error }: { artist: any, results: any, error: any}) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Related Items:</DialogTitle>
                
                <DialogDescription>
                    <span className="font-style: italic font-bold">{artist.ArtistName}</span>
                </DialogDescription>
                
                <Separator orientation="horizontal"/>

                {/* <ScrollArea className={`${results.length > 2 && 'h-100'} p-3 text-left`}> */}
                <ScrollArea className="p-3 text-left max-h-[45dvh] w-full">
                    {!error ? <span>{results.length !== 0 &&
                        results.map((item: any, idx: any) => (
                            <div key={idx} className="mb-2">
                                <MobileItemResult item={item} key={idx}/>
                            </div>
                        ))
                    }</span> : <div className="bg-muted p-3 rounded-md"><p className="text-red-500">{error}</p></div> }

                </ScrollArea>
            </DialogHeader>
        </DialogContent>
    )
}