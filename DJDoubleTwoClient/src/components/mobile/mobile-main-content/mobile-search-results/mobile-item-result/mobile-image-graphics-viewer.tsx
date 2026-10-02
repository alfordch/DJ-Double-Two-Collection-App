import { useState, useEffect } from "react";
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, GalleryHorizontal, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface WebGraphic {
    name: string;
    url?: string;
}

export default function MobileItemGraphicsViewer({ item } : { item: any }) {
    const [currentImage, setCurrentImage] = useState(0)
    const [error, setError] = useState("")
    const [webGraphics, setWebGraphics] = useState<WebGraphic[]>([])
    const [gridView, setGridView] = useState(false)
    const [carouselView, setCarouselView] = useState(true)
    const [imageFullscreen, setImageFullscreen] = useState(false)

    const handlePreviousClick = () => {
        setCurrentImage(currentImage === 0 ? webGraphics.length - 1 : currentImage - 1)
        setImageFullscreen(false)
    }

     const handleNextClick = () => {
        setCurrentImage((currentImage + 1) % webGraphics.length);
        setImageFullscreen(false)
    }

    const handleViewClick = () => {
        setGridView(!gridView);
        setCarouselView(!carouselView);
        setImageFullscreen(false)
    }

    const handleImageClick = (index: number) => {
        setCurrentImage(index);
        handleViewClick();
    }

    const handleFullscreenClick = () => {
        setImageFullscreen(!imageFullscreen)
    }

    const getWebGraphics = async(itemID: number) => {
        let res
        let data
        setError("")

        try {
            res = await fetch(`/graphics/${itemID}`)

            if (!res.ok) {
                throw new Error("Fetch WebGraphics failed")
            }
            data = await res.json()
        }
        catch (err) {
            console.error(err)
            setError("Error Encountered In Call To thedungeon0000 API, Please Try Again Later")
        }
        return data
    }

    useEffect(() => {
        getWebGraphics(item.ItemID)
        .then(setWebGraphics)
        .catch(error => {
            console.error(error);
            setWebGraphics([]);
        });
    }, [item.ItemID]);

    // Sorting based on the following order 
    const order: Record<string, number> = {
        cover: 0,
        cover_1: 1,
        cover_2: 2,
        back_cover: 3,
        back_cover_1: 4,
        back_cover_2: 5,
        disc: 6,
        insert: 7,
    };

    const sortedWebGraphics = [...webGraphics].sort((a, b) => {
        const getSortInfo = (name: string) => {
            const cleanName = name.replace(/\.webp$/i, "").toLowerCase();

            const match = cleanName.match(/^(.+?)(?:_(\d+))?$/);

            const type = match?.[1] ?? cleanName;
            const number = match?.[2] ? Number(match[2]) : 0;

            return {
                weight: order[type] ?? Infinity,
                number,
            };
        };

        const sortA = getSortInfo(a.name);
        const sortB = getSortInfo(b.name);

        if (sortA.weight !== sortB.weight) {
            return sortA.weight - sortB.weight;
        }

        return sortA.number - sortB.number;
    });

    return (
        <div className="-mb-1">
            {carouselView &&
                <div className="flex min-w-0 flex-1 items-center justify-center">
                    {sortedWebGraphics.map((graphic, idx) => (
                        <img src={graphic.url} onClick={handleFullscreenClick} alt="result graphic" className={currentImage === idx ? 'block max-h-[80vh] max-w-full object-contain border-5 drop-shadow-lg border-accent rounded-lg cursor-pointer' : 'hidden'} key={idx}></img>
                    ))}
                </div>
            }

            {imageFullscreen &&
                createPortal(
                    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/90" onClick={handleFullscreenClick}>
                        <img src={sortedWebGraphics[currentImage].url} className="w-full h-full object-contain"/>
                    </div>
                , document.body)
            }

            {gridView &&
                <ScrollArea className={`${sortedWebGraphics.length >= 12 && 'h-[80vh]'}`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-3 py-3 items-center">
                        {sortedWebGraphics.map((graphic, idx) => (
                            // I love magic numbers
                            <div key={idx+99} className="group relative max-w-sm overflow-hidden rounded-lg transition-shadow duration-200 hover:shadow-md">
                                <img src={graphic.url} alt="result graphic" key={idx} className="border-5 drop-shadow-lg border-accent rounded-lg object-cover" ></img>
                                <div key={idx+198} className="absolute bottom-0 left-0 right-0 top-0 h-full w-full inset-0 overflow-hidden bg-muted-foreground opacity-0 hover:opacity-65 cursor-pointer" onClick={() => handleImageClick(idx)}/>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            }

            <Separator orientation="horizontal" className="mt-3 mb-3"/>

            <div className="flex items-center justify-center gap-3">
                {carouselView && <Button variant="outline" className="flex-shrink-0 nav-button left cursor-pointer" onClick={handlePreviousClick}><ChevronLeft/></Button>}

                <Button variant={carouselView ? "secondary" : "ghost"} className={`${carouselView && "drop-shadow-lg"}`} size="lg" onClick={handleViewClick}>
                    <GalleryHorizontal/>
                </Button>
                
                <Button variant={gridView ? "secondary" : "ghost"} className={`${gridView && "drop-shadow-lg"}`} size="lg" onClick={handleViewClick}>
                    <LayoutGrid/>
                </Button>

                {carouselView && <Button variant="outline" className="flex-shrink-0 nav-button right cursor-pointer" onClick={handleNextClick}><ChevronRight/></Button>}
            </div>
        </div>
    )
}