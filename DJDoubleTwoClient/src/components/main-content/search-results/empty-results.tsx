import { ListMusic, LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
   Empty,
   EmptyContent,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "@/components/ui/empty"

export default function EmptySearch({emptyText, Icon, searchType} : {emptyText: string, Icon: LucideIcon, searchType: string}) {
   return (
      <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
         <EmptyHeader>
            <EmptyMedia variant="icon">
               <Icon />
            </EmptyMedia>
            <EmptyTitle>{emptyText}</EmptyTitle>
            <EmptyDescription>
               Use the bar above to search for {searchType}
            </EmptyDescription>
         </EmptyHeader>
         {/* <EmptyContent>
            <div className="flex gap-2">
               <Button className="cursor-pointer">Create Selection</Button>
            </div>
         </EmptyContent> */}
      </Empty>
   )
}
