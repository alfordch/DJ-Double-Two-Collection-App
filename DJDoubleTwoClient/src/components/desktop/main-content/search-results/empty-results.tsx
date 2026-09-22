import { LucideIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import {
   Empty,
   EmptyContent,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "@/components/ui/empty"

export default function EmptySearch({Icon, searchType, noneFound, loading, error} : { Icon: LucideIcon, searchType: string, noneFound?: boolean, loading?: boolean, error?:string}) {
   return (
      <Empty className="from-muted/30 to-background h-full bg-gradient-to-b from-30%">
         <EmptyHeader>
            <EmptyMedia variant="icon">
               {error ? 
                  <Icon className="text-red-500"/>
               :
                  <Icon />
               }
            </EmptyMedia>
            <EmptyTitle>
               {!noneFound && !loading && !error &&
                  <span>No {searchType} yet...</span>
               }
               
               {noneFound &&
                  <span>No {searchType} found...</span>
               }

               {loading &&
                  <div className="flex items-center gap-2"><Spinner />  Searching for {searchType}</div>
               }
               
               {error &&
                  <p className="text-red-500">Error searching for {searchType}</p>
               }
            </EmptyTitle>
            <EmptyDescription>
               {noneFound && 
                  <span>Adjust your search in the bar above to find more {searchType}</span>
               }

               {error &&
                  <span className="text-red-500">{error}</span>
               }

               {!noneFound && !loading && !error &&
                  <span>Use the search bar above to find {searchType}</span>
               }
            </EmptyDescription>
         </EmptyHeader>
         {/* <div className='h-50'></div> */}
      </Empty>
   )
}
