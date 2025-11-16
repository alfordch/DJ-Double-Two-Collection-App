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
import EmptySelection from "@/components/main-content/selections/empty-selections"
import EmptySearch from "@/components/main-content/search-results/empty-results"

export default function Selections() {
   // Get user information
   const { userLoggedIn } = useGlobalAppState()
   const [results, setResults] = useState<any[]>([])
   const [loading, setLoading] = useState(false)
   const [firstPassed, setFirstPassed] = useState(false)
   const [searched, setSearched] = useState(false)
   const [error, setError] = useState("")

   const handleSubmit = async (query: string) => {
      if (!query) {
         return
      }
      try {
         let res
         
         let userID = userLoggedIn.userID
         let selectionName = 'body'
         const body: any = { selectionName: selectionName, selectionUser: userID }

         if (query === '__new__') {
            res = await fetch('/selections/createSelection', {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(body)
            })
         }

         else {
            res = await fetch(`/items/randItems`)
         }

         const data = await res.json()
         setResults(data)
      }
      catch (err) {
         //console.error(err)
         setError("Error Encountered In Call To thedungeon0000 API, Please Try Again Later")
      }
   }
   
   // First pass of getting selections
   async function firstPass() {
      let firstPassRes
      try {
         if (userLoggedIn.userID) {
            setLoading(true)
            setError("")
            let userID = userLoggedIn.userID
            firstPassRes = await fetch(`/selections/getSelections?q=${encodeURIComponent(userID)}`)

            if (!firstPassRes.ok) {
               throw new Error("Fetch Failed")
            }

            const data = await firstPassRes.json()
            setResults(data)
         }
      }
      catch (err) {
         setError("Error Encountered In Call To thedungeon0000 API, Please Try Again Later")
      }
      finally {
         setLoading(false)
      }
   }

   if (userLoggedIn.userID != -1 && results.length == 0 && !firstPassed) {
      setFirstPassed(true)
      firstPass()
   }

   const refresh = () => {
      firstPass()
   }

   return (
      <div className="flex flex-col px-5">
         <div className="flex items-center">
            <MainHeader headertext="My Selections" />
            <AppInput placeholder="My Selections..." buttonLabel="Search" onSubmit={handleSubmit}/>
         </div>

         <Separator orientation="horizontal" className="w-full mb-4" />
         
         <div className="flex flex-col ml-4 mr-4">
            {/* No selections created, and not searching for any (and no error)*/}
            {results.length === 0 && !loading && !error && <EmptySelection />}

            {/* Selections exist, but search yields none */}
            
            {!loading && results.length !== 0 &&
               results.map((selection: any, idx: any) => (
                  <div key={idx} className="mb-2">
                     <SelectionResult selection={selection} onRefresh={refresh} key={idx}/>
                  </div>
               ))
            }
         </div>
      </div>
   )
}