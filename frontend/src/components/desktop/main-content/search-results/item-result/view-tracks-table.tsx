export default function ViewTracksTable({ results, itemArtist }: { results: any, itemArtist: any }) { 
   return (
      <div className="space-y-1">
         <div className="flex font-bold mb-2 px-3">
            <div className="w-20 flex">Tracklist:</div>
         </div>
         {results.map((result: any, idx: any) => (
            <div key={idx} className={`flex p-3 rounded-lg ${idx % 2 === 0 ? "bg-muted/50" : ""} border hover:bg-muted`}>
               <div className="pr-5 flex-none font-bold">{result.TrackItemLoc.replace('CD','').replace('LP','')}</div>
               <div className="flex-1 flex-col">
                  <div className="font-bold">{result.TrackName}</div>
                  <div className="ml-5 text-sm">
                     { result.TrackArtists != itemArtist && (<div className="italic font-bold">{result.TrackArtists}</div>) }
                     <div>Producer: <span className="italic">{result.TrackProducers}</span></div>
                     { result.TrackFeatures != null && (<div>Featuring: <span className="italic">{result.TrackFeatures}</span></div>) }
                  </div>
               </div>
               <div className="pl-5 flex-none text-center">{result.TrackLength.replace('(','').replace(')','')}</div>
            </div>
         ))}
      </div>
   )
}