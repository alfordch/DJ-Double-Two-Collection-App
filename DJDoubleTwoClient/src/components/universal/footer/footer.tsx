import { Separator } from "@/components/ui/separator"
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className="flex flex-col items-center text-sm mb-2 mr-4 ml-4 mt-2">
            <Separator orientation="horizontal" className="mb-2"/>
            <div className="flex gap-3">
                <a target="_blank" href="https://github.com/alfordch/DJ-Double-Two-Collection-App"><p>Github</p></a>
                <a target="_blank" href="https://www.discogs.com/user/DJ.DoubleTwo/collection"><p>Discogs</p></a>
            </div>
            <Link to="/about"><p>About</p></Link>
        </div>
    )
}