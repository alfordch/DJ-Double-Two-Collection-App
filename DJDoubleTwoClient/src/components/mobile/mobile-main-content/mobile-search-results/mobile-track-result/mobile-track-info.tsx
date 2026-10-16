import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"

import MobileTrackViewItem from "@/components/mobile/mobile-main-content/mobile-search-results/mobile-track-result/mobile-track-view-item"

export default function MobileTrackInfo({ track }: { track: any }) {
    const [imgError, setImgError] = useState(false)
    const [itemResult, setItemResult] = useState<any[]>([])
    const [tracksResult, setTracksResult] = useState<any[]>([])
    const [error, setError] = useState("")
    const [loaded, setLoaded] = useState(false)
    
    const handleItemClickSearch = async() => {
        let res
        let res2

        try {
            res = await fetch(`/items/searchItemsByID?q=${track.TrackItem}`)
            res2 = await fetch(`/tracks/searchTracksByItem?q=${encodeURIComponent(track.TrackItem)}`)

            if (!res.ok) {
                throw new Error("Fetch searchItemsByID Failed")
            }
            
            if (!res2.ok) {
                throw new Error("Fetch searchTracksByItem Failed")
            }

            const data = await res.json()
            const data2 = await res2.json()

            setItemResult(data)
            setTracksResult(data2)
            setLoaded(true)
        }
        catch (err) {
            let errorMessage = "Error Encountered In Call To thedungeon0000 API, Please Try Again Later"
            console.error(errorMessage)
            setError(errorMessage)
        }
    }

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
                    
                    <Dialog>
                        <DialogTrigger asChild>
                            <div onClick={handleItemClickSearch} className="italic underline text-foreground leading-tight cursor-pointer">{track.ItemName}</div>
                        </DialogTrigger>
                        {loaded && <MobileTrackViewItem item={itemResult} results={tracksResult} error={error}/>}
                    </Dialog>
                    
                    <p className="text-sm text-foreground leading-tight font-bold">{track.TrackItemLoc} | {track.TrackLength}</p>
                    
                    <Separator/>

                    <p className="text-sm text-foreground leading-tight">{track.ItemLabel} ({track.ItemReleaseYear})</p>
                    {track.TrackFeatures && <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Featuring:</span> {track.TrackFeatures}</p>}
                    <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Produced By:</span> {track.TrackProducers}</p>
                </div>
            </DialogContent>
        </div>
    )
}