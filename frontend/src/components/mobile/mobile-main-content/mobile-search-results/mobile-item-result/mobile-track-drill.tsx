export default function MobileTrackDrill({ track, itemArtist }: { track: any, itemArtist: string }) { 
    const hasFeatures = track.TrackFeatures !== null
    const itemVarious = track.TrackArtists !== itemArtist

    return (
        <div>
            {itemVarious && <p><span className="font-bold">Artists:</span> {track.TrackArtists}</p>}
            <p><span className="font-bold">Produced By:</span> {track.TrackProducers}</p>
            {hasFeatures && <p><span className="font-bold">Featuring:</span> {track.TrackFeatures}</p>}
        </div>
    )
}