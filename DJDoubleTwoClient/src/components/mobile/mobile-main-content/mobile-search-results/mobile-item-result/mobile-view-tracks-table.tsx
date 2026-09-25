export default function MobileViewTracksTable({ results, itemArtist }: { results: any, itemArtist: any }) { 
   /* Check if any features exist, if not, set var to remove that column */
   const hasFeatures = results.some(
      (r: any) => r.TrackFeatures !== null && r.TrackFeatures !== undefined
   );
   
   /* const variousArtists = itemArtist === "Various"; */
   const variousArtists = results.some(
      (r: any) => r.TrackArtists !== itemArtist
   );

   return (
      <div className="flex w-full flex-col">
         {results.map((result: any, idx: any) => (
               <div key={idx} className={`flex p-2 rounded-lg ${idx % 2 === 0 ? "bg-muted/50" : ""} hover:bg-muted`}>
                  <div className="w-15 font-bold">{result.TrackItemLoc}</div>
                  <div className="flex-1">{result.TrackName}</div>
                  {/* { variousArtists && (<div className="flex-1 mr-4">{result.TrackArtists}</div>) } */}
                  {/* <div className="flex-1 mr-4">{result.TrackProducers}</div> */}
                  {/* { hasFeatures && (<div className="flex-1 mr-3">{result.TrackFeatures}</div>) } */}
                  <div className="w-20 flex-none text-center font-mono">{result.TrackLength}</div>
               </div>
         ))}
      </div>
   )
}