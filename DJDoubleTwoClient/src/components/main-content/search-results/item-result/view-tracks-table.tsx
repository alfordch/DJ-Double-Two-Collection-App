import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ViewTracksTable({ results }: { results: any }) { 
    /* Check if any features exist, if not, set state to remove that column */
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item Location</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Produced By</TableHead>
                        <TableHead>Featuring</TableHead>
                        <TableHead className="text-center">Track Length</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results.map((result: any, idx: any) =>
                        <TableRow key={idx} className={idx % 2 === 0 ? "bg-muted/50" : ""}>
                            <TableCell className="font-bold">{result.TrackItemLoc}</TableCell>
                            <TableCell>{result.TrackName}</TableCell>
                            <TableCell>{result.TrackProducers}</TableCell>
                            <TableCell className="text-wrap">{result.TrackFeatures}</TableCell>
                            <TableCell className="text-center">{result.TrackLength}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}