import {
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden"

import MobileViewTracks from "@/components/mobile/mobile-main-content/mobile-search-results/mobile-item-result/mobile-view-tracks"

export default function MobileTrackViewItem({ item, results, error } : { item: any, results: any, error: any }) {
    var realReleaseDate = true

    if (item[0].ItemReleaseMonth === 1 && item[0].ItemReleaseDay === 1) {
        realReleaseDate = false
    }
    return (
        <DialogContent showCloseButton={true}>
            {/* Fix radix error with dialog title */}
            <DialogTitle asChild>
                <VisuallyHidden>Hidden dialog title</VisuallyHidden>
            </DialogTitle>
            <DialogDescription asChild>
                <VisuallyHidden>Hidden dialog description</VisuallyHidden>
            </DialogDescription>
            <div>
                <MobileViewTracks item={item[0]} results={results} error={error} realReleaseDate={realReleaseDate} renderDialogContent={false}/>
            </div>
        </DialogContent>
    )
}