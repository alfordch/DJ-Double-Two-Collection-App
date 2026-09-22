export default function ViewTracksTable({ results, itemArtist }: { results: any, itemArtist: any }) { 
   /* Check if any features exist, if not, set var to remove that column */
   const hasFeatures = results.some(
      (r: any) => r.TrackFeatures !== null && r.TrackFeatures !== undefined
   );
   
   /* const variousArtists = itemArtist === "Various"; */
   const variousArtists = results.some(
      (r: any) => r.TrackArtists !== itemArtist
   );

   return (
      <div className="space-y-1">
         <div className="flex font-bold mb-2 px-3">
               <div className="w-20 flex"></div>
               <div className="flex-1 mr-4">Title</div>
               { variousArtists && <div className="flex-1 mr-4">Artist</div>}
               <div className="flex-1 mr-4">Produced By</div>
               { hasFeatures && <div className="flex-1 mr-3">Featuring</div> }
               <div className="w-25 flex-none text-center">Track Length</div>
         </div>
         {results.map((result: any, idx: any) => (
               <div key={idx} className={`flex p-3 rounded-lg ${idx % 2 === 0 ? "bg-muted/50" : ""} hover:bg-muted`}>
                  <div className="w-20 flex-none font-bold">{result.TrackItemLoc}</div>
                  <div className="flex-1 mr-4">{result.TrackName}</div>
                  { variousArtists && (<div className="flex-1 mr-4">{result.TrackArtists}</div>) }
                  <div className="flex-1 mr-4">{result.TrackProducers}</div>
                  { hasFeatures && (<div className="flex-1 mr-3">{result.TrackFeatures}</div>) }
                  <div className="w-25 flex-none text-center font-mono">{result.TrackLength}</div>
               </div>
         ))}
      </div>
   )
}