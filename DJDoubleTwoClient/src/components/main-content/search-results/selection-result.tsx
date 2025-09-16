import { ListMusic } from "lucide-react"

export default function SelectionResult({ selection }: { selection: any}) {
    return (
        <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="relative bg-cover bg-no-repeat">
                    <ListMusic className="w-10 h-10 bg-accent rounded-lg p-1 text-muted-foreground" />
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