import { ListMusic } from "lucide-react"

export default function SelectionResult({ selection }: { selection: any}) {
    return (
        <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition">
         <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
                    <ListMusic className="w-25 h-25 bg-accent rounded-lg p-1 text-muted-foreground drop-shadow-lg" />
                </div>
                <div className="flex flex-col">
                    {selection.selectionName}
                    {selection.added && (
                        <p className="text-sm text-muted-foreground leading-tight">Already added to this selection</p>
                    )}
                </div>
            </div>
        </div>
    )
}