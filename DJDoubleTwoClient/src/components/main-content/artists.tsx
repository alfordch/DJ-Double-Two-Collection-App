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
               <p className="-mt-2 mb-2 font-bold text-md">{resultsLength} artists found</p>
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
                        <PaginationItem className="cursor-pointer">
                           <div onClick={() => handlePageChange(currentPage - 1)}><PaginationPrevious/></div>
                        </PaginationItem>
                        {Array.from({ length : totalPages }, (_: any, index: any) => index).map(function(idx) {
                           if (idx === currentPage) {
                           return(
                              <PaginationItem className="cursor-pointer" key={idx}>
                                 <PaginationLink isActive>{idx + 1}</PaginationLink>
                              </PaginationItem>
                           )
                           }
                           return(
                              <PaginationItem className="cursor-pointer" key={idx}>
                                 <div onClick={() => handlePageChange(idx)}><PaginationLink>{idx + 1}</PaginationLink></div>
                              </PaginationItem>
                           )
                        })}
                        <PaginationItem className="cursor-pointer">
                           <div onClick={() => handlePageChange(currentPage + 1)}><PaginationNext/></div>
                        </PaginationItem>
                     </PaginationContent>
                  </Pagination>
                  <Separator orientation="horizontal" className="w-full mb-4 mt-2" />
               </div>
            }
         </div>
      </div>
   )
}
