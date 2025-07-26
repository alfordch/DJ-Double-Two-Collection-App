import { Disc3 } from "lucide-react"

export default function ItemResult({ item }: { item: any }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition">
      <div className="flex items-center gap-3">
        <Disc3 className="w-10 h-10 bg-accent-foreground rounded-lg p-1 text-muted-foreground" />
        <div className="flex flex-col">
            <p className="font-bold leading-tight">{item.ItemName}</p>
            <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Artist:</span> {item.ItemArtists}</p>
            <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Label:</span> {item.ItemLabel}</p>
            <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Release Date:</span> {item.ItemReleaseMonth}/{item.ItemReleaseDay}/{item.ItemReleaseYear}</p>
            <p className="text-sm text-muted-foreground leading-tight"><span className="font-bold">Track Count:</span> {item.ItemTrackCount}</p>
        </div>
      </div>
      <div className="text-lg font-bold">
        <p className="text-lg font-bold rounded-lg p-1 bg-accent">{item.ItemFormat}</p>
      </div>
    </div>
  )
}