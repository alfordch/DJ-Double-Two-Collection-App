import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Rss } from "lucide-react"

interface WebGraphic {
    name: string;
    url?: string;
}

export default function ItemGraphicsCarousel({ item } : { item: any }) {
    const [currentImage, setCurrentImage] = useState(0)
    const [error, setError] = useState("")
    const [webGraphics, setWebGraphics] = useState<WebGraphic[]>([])

    const handlePreviousClick = () => {
        setCurrentImage(currentImage === 0 ? webGraphics.length - 1 : currentImage - 1)
    }

     const handleNextClick = () => {
        setCurrentImage((currentImage + 1) % webGraphics.length);
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
        back_cover: 1,
        disc: 2,
        insert: 3,
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
        <div className="flex w-full min-w-0 items-center gap-3 overflow-hidden">
            <button className="flex-shrink-0 nav-button left cursor-pointer" onClick={handlePreviousClick}><ChevronLeft className="w-10 h-10"/></button>
            
            <div className="flex min-w-0 flex-1 items-center justify-center overflow-hidden drop-shadow-lg">
                {sortedWebGraphics.map((graphic, idx) => (
                    <img src={graphic.url} alt="image" className={currentImage === idx ? 'block max-h-[70vh] max-w-full object-contain' : 'hidden'} key={idx}></img>
                ))}
            </div>

            <button className="flex-shrink-0 nav-button right cursor-pointer" onClick={handleNextClick}><ChevronRight className="w-10 h-10"/></button>
        </div>
    )
}