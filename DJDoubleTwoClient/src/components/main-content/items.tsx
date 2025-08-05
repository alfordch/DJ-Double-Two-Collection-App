import { useState } from "react"
import { AppInput } from "@/components/input/app-input"
import { MainHeader } from "@/components/main-header"
import { Separator } from "@/components/ui/separator"

// Result import
import ItemResult from "./search-results/items-result"

export default function Items() {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)
  const [resultsLength, setResultsLength] = useState(0)

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
        res = await fetch(`/items/randItems`)
      }
      else {
        res = await fetch(`/items/searchItems?q=${encodeURIComponent(query)}`)
      }

      if (!res.ok) { 
        throw new Error("Fetch Failed")
      }

      const data = await res.json()
      setResults(data)
      setResultsLength(data.length)
    } 
    catch (err) {
      console.error(err)
      setError("Error Encountered In Call To thedungeon0000 API, Please Try Again Later")
    } 
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col px-4">
      {/* Page Header: Header + Search Input on the same row */}
      <div className="flex items-center">
        <MainHeader headertext="Items" />
        <AppInput placeholder="Items..." buttonLabel="Search" onSubmit={handleSearch} />
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
          <p className="text-muted-foreground">No Results Found</p>
        )}

        {!loading &&
          results.map((item, idx) => (
            <div key={idx} className="mb-2">
              <ItemResult item={item} key={idx}/>
            </div>
          ))}

        {!searched && <p className="text-muted-foreground">No results yet...</p>}

      </div>
    </div>
  )
}
