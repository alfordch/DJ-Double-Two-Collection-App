import { useState, useEffect } from "react";
import { CircleChevronLeft, CircleChevronRight, Rss } from "lucide-react"

interface WebGraphic {
    name: string;
    url: string;
}

export default function ItemGraphicsCarousel({ item } : { item: any }) {
    const [currentImage, setCurrentImage] = useState(0)
    const [error, setError] = useState("")
    const [webGraphics, setWebGraphics] = useState<WebGraphic[]>([])

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

    console.log(webGraphics)
    return (
        <p>
            {/* {webGraphics.map((graphic: any, idx: any) => (
                <img src={graphic.url} key={idx} className="w-10 h-10"></img>
            ))} */}
        </p>
    )
}