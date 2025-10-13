import { useState } from "react"
import { AppInput } from "@/components/input/app-input"
import { MainHeader } from "@/components/main-header"
import { Separator } from "@/components/ui/separator"
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination"
import { useGlobalAppState, globalAppInterface } from "@/app-context/app-context"

import SelectionResult from "@/components/main-content/search-results/selection-result"

export default function Selections() {
   // Get user information
   const { userLoggedIn } = useGlobalAppState()
   const [results, setResults] = useState<any[]>([])
   const [error, setError] = useState("")

   const handleSubmit = async (query: string) => {
      if (!query) {
         return
      }
      try {
         let res
         
         let userID = userLoggedIn.userID
         let selectionName = 'body'
         const body: any = { userID, selectionName}

         if (query === '__new__') {
            res = await fetch('/selections/createSelection', {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(body)
            })
         }

         const data = await res?.json()
         setResults(data)
      }
      catch (err) {
         console.error(err)
         setError("Error Encountered In Call To thedungeon0000 API, Please Try Again Later")
      }
   }
   return (
      <div className="flex flex-col px-4">
         <div className="flex items-center">
            <MainHeader headertext="My Selections" />
            <AppInput placeholder="My Selections..." buttonLabel="Search" onSubmit={handleSubmit}/>
         </div>

         <Separator orientation="horizontal" className="w-full mb-4" />
      </div>
   )
}