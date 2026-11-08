export default function ViewTracksTable({ results, itemArtist }: { results: any, itemArtist: any }) { 
   return (
      <div className="space-y-1">
         <div className="flex font-bold mb-2 px-3">
               <div className="w-20 flex">Tracklist:</div>
         </div>
         {results.map((result: any, idx: any) => (
               <div key={idx} className={`flex p-3 rounded-lg ${idx % 2 === 0 ? "bg-muted/50" : ""} hover:bg-muted`}>
                  <div className="w-20 flex-none font-bold">{result.TrackItemLoc}</div>
                  <div className="flex-1 flex-col">
                     <div className="font-bold">{result.TrackName}</div>
                     <div className="ml-5">
                        { result.TrackArtists != itemArtist && (<div className="text-sm italic">{result.TrackArtists}</div>) }
                        <div className="text-sm">Producer: <span className="italic">{result.TrackProducers}</span></div>
                        { result.TrackFeatures != null && (<div className="text-sm">Featuring: <span className="italic">{result.TrackFeatures}</span></div>) }
                     </div>
                  </div>
                  <div className="w-25 flex-none text-center font-mono">{result.TrackLength}</div>
               </div>
         ))}
      </div>
   )
}