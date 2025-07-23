import { AudioLines } from "lucide-react"

export default function TrackResult({ track }: { track: any }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition">
      <div className="flex items-center gap-3">
        <AudioLines className="w-6 h-6 text-muted-foreground" />
        <div className="flex flex-col">
            <p className="font-bold leading-tight">{track.TrackName}</p>
            <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Artist:</span> {track.TrackArtists}</p>
            <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Item:</span> {track.ItemName} ({track.ItemLabel}) [{track.ItemReleaseYear}] | {track.TrackItemLoc}</p>
            {track.TrackFeatures && <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Featuring:</span> {track.TrackFeatures}</p>}
            <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Produced By:</span> {track.TrackProducers}</p>
        </div>
      </div>
      <div className="text-lg font-bold">
        <p className="text-lg font-bold">{track.TrackLength}</p>
      </div>
    </div>
  )
}