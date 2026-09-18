import { useState } from "react"
import { Music, Disc3, MicVocal } from "lucide-react"
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
import TrackResult from "@/components/main-content/search-results/track-result/tracks-result"
import ItemResult from "@/components/main-content/search-results/item-result/items-result"
import ArtistResult from "@/components/main-content/search-results/artist-result/artists-result"
import EmptySearch from "@/components/main-content/search-results/empty-results"

export default function MainContent({ contentType } : { contentType: string }) {
    // Set contentType vars
    const apiRoutes = [{'parent': 'tracks', 'shuffle' : 'randTracks', 'search' : 'searchTracks'},
                       {'parent': 'items', 'shuffle' : 'randItems', 'search' : 'searchItems'},
                       {'parent': 'artists', 'shuffle' : 'randArtists', 'search' : 'searchArtists'},]
    const icons = [Music, Disc3, MicVocal]
    const headerTexts = ['Tracks','Items','Artists']
    const searchPlaceholders = ['Tracks...', 'Items...', 'Artists...']
    const lowerType = contentType.toLowerCase()
    const types: Record<string, number> = {
        Tracks: 0,
        Items: 1,
        Artists: 2
    }
    const index = types[contentType] ?? 0

    const ResultComponent = ({ result, type }: { result: any; type: number }) => {
        switch (type) {
            case 0:
                return <TrackResult track={result} />;
            case 1:
                return <ItemResult item={result} />;
            case 2:
                return <ArtistResult artist={result} />;
            default: 
                return null
        }
    }

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
        if (!query) {
            return
        }

        let res
        
        try {
            setLoading(true)
            setSearched(true)
            setError("")
        
            if (query === '__shuffle__') {
                res = await fetch(`/${apiRoutes[index]['parent']}/${apiRoutes[index]['shuffle']}`)
            }
            else {
                res = await fetch(`/${apiRoutes[index]['parent']}/${apiRoutes[index]['search']}?q=${encodeURIComponent(query)}`)
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
            let errorMessage = "Error Encountered In Call To thedungeon0000 API, Please Try Again Later"

            if (res) {
            errorMessage = `${res.status}: ${res.statusText}`
            }

            setError(errorMessage)
            setResults([])
            setCurrentPage(0)
            setTotalPages(0)
            setResultsLength(0)
            setCurrentPaginationList([])
            setResultsPages([])
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
        <div className="flex flex-col px-5">
            <div className="flex items-center absolute sticky top-2 mt-2 rounded-lg backdrop-blur-2xl rounded-md z-10 shadow-xl mb-4">
                <MainHeader headertext={headerTexts[index]} />
                <AppInput placeholder={searchPlaceholders[index]} buttonLabel="Search" onSubmit={handleSearch} />
            </div>

            {/* <Separator orientation="horizontal" className="w-full mb-4" /> */}
            
            <div className="flex flex-col ml-4 mr-4">
                {!loading && resultsLength !== 0 && searched && (
                    <p className="-mt-2 mb-2 font-bold text-md">{resultsLength} {lowerType} found</p>
                )}
                
                {loading && 
                    <EmptySearch Icon={Music} searchType={contentType} loading={true} />
                }

                {error && 
                    <EmptySearch Icon={Music} searchType={contentType} error={error} />
                }

                {!loading && !error && results.length === 0 && searched && 
                    <EmptySearch Icon={Music} searchType={contentType} noneFound={true}/>
                }

                {!loading && searched && results.length !== 0 && 
                    resultsPages[currentPage].map((result: any, idx: number) => (
                        <div key={idx} className="mb-2">
                            <ResultComponent result={result} type={index} />
                        </div>
                    ))
                }

                {!searched && <EmptySearch Icon={icons[index]} searchType={contentType} />}
                
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