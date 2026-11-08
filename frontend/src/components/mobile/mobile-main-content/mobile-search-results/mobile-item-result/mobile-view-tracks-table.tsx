export default function MobileViewTracksTable({ results, itemArtist }: { results: any, itemArtist: any }) { 
   return (
      <div className="flex w-full flex-col text-sm gap-1">
         {results.map((result: any, idx: any) => (
            <div key={idx} className={`flex w-full text-left min-w-0 items-start p-2 rounded-lg ${idx % 2 === 0 ? "bg-muted/50" : ""} border hover:bg-muted`}>
               <div className="min-w-0 flex-1 break-words" style={{minWidth: 0, overflowWrap: "anywhere", wordBreak: "normal"}}>
                  <div className="text-xs">{result.TrackItemLoc.replace('CD','').replace('LP','')}</div>
                  <div className="font-bold">{result.TrackName}</div>
                  <div className="ml-3 text-xs">
                     { result.TrackArtists != itemArtist && (<div><span className="italic font-bold">{result.TrackArtists}</span></div>) }
                     <div>Producer: <span className="italic">{result.TrackProducers}</span></div>
                     { result.TrackFeatures != null && (<div>Featuring: <span className="italic">{result.TrackFeatures}</span></div>) }
                  </div>
               </div>
               <div className="pl-3 shrink-0 text-right text-xs">{result.TrackLength.replace('(','').replace(')','')}</div>
            </div>
         ))}
      </div>
   )
}