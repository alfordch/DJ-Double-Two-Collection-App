import { useState } from "react"
import { ListMusic, Ellipsis, Plus, Share, Trash2, PencilLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu"
import {
   Dialog,
   DialogTrigger
} from "@/components/ui/dialog"

import { useGlobalAppState, globalAppInterface } from "@/app-context/app-context"
import DeleteSelectionResult from "@/components/main-content/selections/delete-selection"
import RenameSelectionResult from "@/components/main-content/selections/rename-selection"

export default function SelectionResult({ selection }: { selection: any}) {
   const { userLoggedIn } = useGlobalAppState()
   const [showDeleteDialog, setShowDeleteDialog] = useState(false)
   const [showAddDialog, setShowAddDialog] = useState(false)
   const [showRenameDialog, setShowRenameDialog] = useState(false)
   const [showShareDialog, setShowShareDialog] = useState(false)

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
                     <DropdownMenuItem className="cursor-pointer" onSelect={() => setShowAddDialog(true)}><Plus />Add New Tracks</DropdownMenuItem>
                     <DropdownMenuItem className="cursor-pointer" onSelect={() => setShowRenameDialog(true)}><PencilLine />Rename</DropdownMenuItem>
                     {/* <DropdownMenuItem className="cursor-pointer" onSelect={() => setShowShareDialog(true)}><Share />Share</DropdownMenuItem> */}
                     <DropdownMenuSeparator />
                     <DropdownMenuItem className="text-red-500 font-bold cursor-pointer" onSelect={() => setShowDeleteDialog(true)}>
                        <Trash2 className="text-red-500" />
                        Delete
                     </DropdownMenuItem>
                  </DropdownMenuGroup>
               </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
               <DeleteSelectionResult selection={selection} />
            </Dialog>
            <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
               <RenameSelectionResult selection={selection} />
            </Dialog>
         </div>
      </div>
   )
}