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

// Result import
import ArtistResult from "./search-results/artists-result"

export default function Artists() {
   const [results, setResults] = useState<any[]>([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [searched, setSearched] = useState(false)
   const [resultsLength, setResultsLength] = useState(0)

   // Pagination vars/states
   const [totalPages, setTotalPages] = useState(0)
   const [resultsPages, setResultsPages] = useState<any[]>([])
   const [resultsPerPage, setResultsPerPage] = useState(25)
   const [currentPaginationList, setCurrentPaginationList] = useState<any>([])
   const [currentPage, setCurrentPage] = useState(0)

   const handleSearch = async (query: string) => {
      // Check for empty query
      if (!query) {
         return
      }
      try {
         setLoading(true)
         setSearched(true)
         setError("")
         let res
      
         // Check for shuffle button click
         if (query === '__shuffle__') {
         res = await fetch(`/artists/randArtists`)
         }
         else {
         res = await fetch(`/artists/searchArtists?q=${encodeURIComponent(query)}`)
         }

         if (!res.ok) { 
         throw new Error("Fetch Failed")
         }

         const data = await res.json()
         setResults(data)
         setResultsLength(data.length)

         // Handle Pagination
         setCurrentPage(0)
         setTotalPages(Math.ceil(data.length / resultsPerPage))
         
         const tempSlices = []
         for (let i = 0; i < data.length; i += resultsPerPage) {
            tempSlices.push(data.slice(i, i + resultsPerPage))
         }

         let tempPaginationList: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
         tempPaginationList = tempPaginationList.filter((element: number) => element <= tempSlices.length)

         if (tempSlices.length > 5) {
            tempPaginationList = [1, 2, 3, 4, 5, <PaginationEllipsis />]
         }

         setCurrentPaginationList(tempPaginationList)
         setResultsPages(tempSlices)
      } 
      catch (err) {
         console.error(err)
         setError("Error Encountered In Call To thedungeon0000 API, Please Try Again Later")
      } 
      finally {
         setLoading(false)
      }
   }

   const handlePageChange = (pageValue: number) => {
      if (pageValue === -1 || pageValue === totalPages) {
         return
      }
      // I am not proud of the rest of the code in this function, I will not lie
      if (!currentPaginationList.includes(pageValue + 1)) {
         let tempPaginationList: any[] = Array.from({ length: 5 }, (_, i) => (Math.floor(pageValue / 5) * 5) + 1 + i);
         
         if (tempPaginationList[tempPaginationList.length - 1] > totalPages) {
            tempPaginationList = tempPaginationList.filter((element: number) => element <= totalPages)
         }
         
         if (tempPaginationList[0] !== 1) {
            tempPaginationList.unshift(<PaginationEllipsis />)
         }
         
         if (tempPaginationList[tempPaginationList.length - 1] < totalPages) {
            tempPaginationList.push(<PaginationEllipsis />)
         }
         
         setCurrentPaginationList(tempPaginationList)
      }
      setCurrentPage(pageValue)
      setResults(resultsPages[pageValue])
      window.scrollTo(0,0)
   }

   return (
      <div className="flex flex-col px-4">
      {/* Page Header: Header + Search Input on the same row */}
         <div className="flex items-center">
            <MainHeader headertext="Artists" />
            <AppInput placeholder="Artists..." buttonLabel="Search" onSubmit={handleSearch} />
         </div>

         {/* Separator */}
         <Separator orientation="horizontal" className="w-full mb-4" />

         {/* Search Results */}
         <div className="flex flex-col ml-4">

            {!loading && resultsLength !== 0 && searched && (
               <p className="-mt-2 mb-2 font-bold text-md">{resultsLength} items found</p>
            )}
            
            {loading && <p className="text-muted-foreground">Loading...</p>}
            
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && results.length === 0 && searched && (
               <p className="text-muted-foreground">No results found</p>
            )}

            {!loading && searched && results.length !== 0 && 
               resultsPages[currentPage].map((artist: any, idx: any) => (
               <div key={idx} className="mb-2">
                  <ArtistResult artist={artist} key={idx}/>
               </div>
               ))}

            {!searched && <p className="text-muted-foreground">No results yet...</p>}
            
            {!loading && searched && totalPages == 1 && 
               <Separator orientation="horizontal" className="w-full mb-4 mt-2" />
            }

            {!loading && searched && totalPages > 1 &&
               <div>
                  <Pagination>
                     <PaginationContent>
                        {currentPage > 0 && 
                           <PaginationItem className="cursor-pointer">
                              <div onClick={() => handlePageChange(currentPage - 1)}><PaginationPrevious/></div>
                           </PaginationItem>
                        }
                        {currentPaginationList.map((page: any, idx: any) => {
                           // Load ellipsis
                           if (typeof page != "number") {
                              return(
                                 <PaginationItem key={idx}>
                                    <PaginationLink>{page}</PaginationLink>
                                 </PaginationItem>
                              )
                           }
                           if (page - 1 === currentPage) {
                              return(
                                 <PaginationItem className="cursor-pointer" key={idx}>
                                    <PaginationLink isActive>{page}</PaginationLink>
                                 </PaginationItem>
                              )
                           }
                           else {
                              return(
                                 <PaginationItem className="cursor-pointer" key={idx}>
                                    <PaginationLink onClick={() => handlePageChange(page - 1)}>{page}</PaginationLink>
                                 </PaginationItem>
                              )
                           }
                        }
                        )}
                        {currentPage < totalPages - 1 &&
                           <PaginationItem className="cursor-pointer">
                              <div onClick={() => handlePageChange(currentPage + 1)}><PaginationNext/></div>
                           </PaginationItem>
                        }
                     </PaginationContent>
                  </Pagination>
                  <Separator orientation="horizontal" className="w-full mb-4 mt-2" />
               </div>
            }
         </div>
      </div>
   )
}
