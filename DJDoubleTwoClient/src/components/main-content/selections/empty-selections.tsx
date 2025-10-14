import { ListMusic } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
   Empty,
   EmptyContent,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "@/components/ui/empty"

export default function EmptySelection() {
   return (
      <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
         <EmptyHeader>
            <EmptyMedia variant="icon">
               <ListMusic />
            </EmptyMedia>
            <EmptyTitle>No Selections Yet</EmptyTitle>
            <EmptyDescription>
               You haven&apos;t created any Selections yet. Get started by creating
               your first Selection.
            </EmptyDescription>
         </EmptyHeader>
         <EmptyContent>
            <div className="flex gap-2">
               <Button className="cursor-pointer">Create Selection</Button>
            </div>
         </EmptyContent>
      </Empty>
   )
}
