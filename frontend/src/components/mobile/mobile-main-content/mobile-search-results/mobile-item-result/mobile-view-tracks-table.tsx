import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import MobileTrackDrill from"@/components/mobile/mobile-main-content/mobile-search-results/mobile-item-result/mobile-track-drill"

export default function MobileViewTracksTable({ results, itemArtist }: { results: any, itemArtist: any }) { 
   return (
      <div className="flex w-full flex-col text-sm">
         {results.map((result: any, idx: any) => (
            <Tooltip key={idx}>
               <TooltipTrigger>
               <div key={idx} className={`flex w-full min-w-0 items-start p-2 rounded-lg ${idx % 2 === 0 ? "bg-muted/50" : ""} hover:bg-muted`}>
                  <div className="w-15 shrink-0 font-bold">{result.TrackItemLoc}</div>
                  <div className="min-w-0 flex-1 break-words" style={{minWidth: 0, overflowWrap: "anywhere", wordBreak: "normal"}}>{result.TrackName}</div>
                  <div className="w-20 shrink-0 text-center font-mono">{result.TrackLength}</div>
               </div>
               </TooltipTrigger>
               <TooltipContent>
                  <MobileTrackDrill track={result} itemArtist={itemArtist} key={idx}/>
               </TooltipContent>
            </Tooltip>
         ))}
      </div>
   )
}