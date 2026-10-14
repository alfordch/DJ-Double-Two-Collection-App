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

export default function MobileTrackInfo({ track }: { track: any }) {
   const [imgError, setImgError] = useState(false)

    return (
        <div>
            <DialogContent showCloseButton={false} className="w-3/4">
                {/* Fix radix error with dialog title */}
                <DialogTitle asChild>
                    <VisuallyHidden>Hidden dialog title</VisuallyHidden>
                </DialogTitle>
                <DialogDescription asChild>
                  <VisuallyHidden>Hidden dialog description</VisuallyHidden>
                </DialogDescription>
                <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-2 -mb-2 text-center">
                    <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
                        {!imgError ? 
                            <img src={`/webGraphics/${track.TrackItem}/${track.TrackItem}.webp`} alt={`${track.ItemName} cover`} onError={() => setImgError(true)} className="w-55 h-55 rounded-lg drop-shadow-lg border-3 border-black"/>
                        :
                            <img src={`/fallbackGraphics/${track.ItemCoverImage}`} alt={`${track.ItemName} cover`} onError={() => setImgError(true)} className="w-55 h-55 rounded-lg drop-shadow-lg border-3 border-black"/>
                        }
                    </div>

                    <p className="font-bold leading-tight">{track.TrackName}</p>
                    <p className="text-sm text-muted-foreground leading-tight font-bold">{track.TrackArtists}</p>
                    <p className="text-sm text-foreground leading-tight">{track.ItemName}</p>
                    <p className="text-sm text-foreground leading-tight font-bold">{track.TrackItemLoc}</p>
                    
                    <Separator/>

                    <p className="text-sm text-foreground leading-tight">{track.ItemLabel} ({track.ItemReleaseYear})</p>
                    {track.TrackFeatures && <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Featuring:</span> {track.TrackFeatures}</p>}
                    <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Produced By:</span> {track.TrackProducers}</p>
                </div>
            </DialogContent>
        </div>
    )
}