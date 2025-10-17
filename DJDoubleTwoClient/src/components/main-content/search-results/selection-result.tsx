import { ListMusic, Ellipsis, Plus, Share, Trash2, PencilLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"

export default function SelectionResult({ selection }: { selection: any}) {
   return (
      <div className="flex items-center justify-between p-3 rounded-md border shadow-sm hover:bg-muted transition">
         <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 bg-cover bg-no-repeat">
                     <ListMusic className="w-25 h-25 bg-accent rounded-lg p-1 text-muted-foreground drop-shadow-lg" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                  <p className="font-bold leading-tight">{selection.selectionName}</p>
            </div>
         </div>
         <div className="text-lg font-bold drop-shadow-lg">
            <DropdownMenu modal={false}>
               <DropdownMenuTrigger asChild>
                  <Button type="button" variant="outline" className="cursor-pointer">
                     <Ellipsis />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuGroup>
                     <DropdownMenuItem className="cursor-pointer"><Plus />Add New Tracks</DropdownMenuItem>
                     <DropdownMenuItem className="cursor-pointer"><PencilLine />Rename</DropdownMenuItem>
                     <DropdownMenuItem className="cursor-pointer"><Share />Share</DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem className="text-red-500 font-bold cursor-pointer"><Trash2 className="text-red-500" />Delete</DropdownMenuItem>
                  </DropdownMenuGroup>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </div>
   )
}