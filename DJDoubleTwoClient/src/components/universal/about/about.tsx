export default function About() {
    return (
        <div className="bg-muted m-5 p-3 rounded-lg drop-shadow-xl">
            <p className="text-m font-bold mb-2">About</p>
            <p className="text-sm mb-3">
                This project is the result of 1 year of catalogging, 2 years of development, almost a full decade of music collection, and a lifetime of Hip-Hop appreciation. 
                What started as the idea of creating a simple tool for digitally accessing the tracks in my physical media collection has evolved into a full archiving effort.
                While I would not call myself an archivist based on my work here, I would best describe this as an archive of my Hip-Hop physical media collection. 
            </p>

            <p className="text-sm mb-3">
                This project started when I was looking through my collection for tracks produced by Pete Rock for a playlist that I was creating. While Discogs offers a pretty sophisticated searching function for your colleciton,
                I found that, unless you have the original pressing of an item in your collection, the credits are not very well documented. I then learned that the credits on a release in Discogs are largely community maintained.
                So, if I decided to pick up a repress of a record, the release itself will definitely be in Discogs, but details like the producer credits or track lengths will be missing until someone submits an update. 
            </p>
            
            <p className="text-sm mb-3">
                While I will recognize that Discogs as a database and marketplace serve its purpose well, I found that searching my collection full of a healthy mix of original releases and represses did not always yield the results I needed.
                So, I created this project to fix that problem. Every producer credit, feature, track length, release year and track count is present in my database, and every search query is optimized to return the appropriate results.
            </p>
            
            <p className="text-m font-bold mb-2">The Boring Parts</p>

            <p className="text-sm mb-3">
                All of the images displayed on this website are 1200+ dpi scans taken with the VIISAN VF3240 flatbed scanner. For items that do not fit the A3 bed size of this scanner (i.e. vinyl record sleeves),
                various image stitching softwares were used. These softwares include Hugin, Microsoft Image Composite Editor, and Vuescan 9. I found the easiest workflow using the built in stitching feature for the Vuescan 9
                scanning software, but Hugin proved to be best for stitches with lower overlap percentages. 
            </p>

            <p className="text-sm mb-3">
                All of the credits and information on releases, artists, and tracks are an aggregation of data from public sources like Discogs, MusicBrainz, ASCAP, AllMusic, BMI, and the text written on the items themselves.
            </p>
            
            <p className="text-sm mb-3">
                I would like to stress that I am not an archivist, rather a Hip-Hop head with a computer science degree who wanted to 
                create a more personalized experience than Discogs. My process for creating this website is nowhere near perfect, and you will see some less than archive-quality scans if you spend enough time here.  
                As such, I do not offer the details above as any sort of methodology or archiving recommendation, but as a record for future reference.
            </p>
            
            <p className="text-sm mb-3">
                If you would like to view more of the boring details, my GitHub project is linked at the bottom of the page on mobile or in the sidebar on desktop. My Discogs profile is also linked there if you are interested.
            </p>

            <p className="text-sm">
                Of course, I am human and have no doubts that there were many mistakes made while completing this project. If you notice any typos, image errors, or even misinformation as you search through these pages, I would appreciate
                it if you reached out to me at DJDoubleTwo4@gmail.com letting me know.
            </p>
        </div>
    )
}