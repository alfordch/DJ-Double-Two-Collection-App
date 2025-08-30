import { MicVocal } from "lucide-react"

export default function ArtistResult({ artist }: { artist: any }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition">
      <div className="flex items-center gap-3">

        {artist.ArtistImage === null && (
          <MicVocal className="w-25 h-25 bg-accent rounded-lg p-1 text-muted-foreground" />
        )}

        {artist.ArtistImage !== null && (
          <img src={`/artistImages/${artist.ArtistImage}`} alt={`${artist.ArtistName} image`} className="w-25 h-25 rounded-lg drop-shadow-lg object-cover"/>
        )}
        <div className="flex flex-col">
            <p className="font-bold leading-tight">{artist.ArtistName}</p>
            {artist.GroupMemberships && 
                <p className="text-sm text-muted-foreground leading-tight">
                    <span className="font-bold">In Group{artist.GroupCount > 1 && 
                        <span className="font-bold">s</span>}:
                    </span> {artist.GroupMemberships}
                </p>
            }
            {artist.ItemCount > 0 && 
                <p className="text-sm text-muted-foreground leading-tight">
                    <span className="font-bold">
                        Collection Item{artist.ItemCount > 1 &&
                        <span className="font-bold">s</span>}:
                    </span> {artist.ItemCount}
                </p>}
        </div>
      </div>
      <div className="text-lg font-bold">
        <p className="text-lg font-bold rounded-lg p-1 bg-accent">{artist.ArtistHometown}</p>
      </div>
    </div>
  )
}