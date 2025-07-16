import { AppInput } from "@/components/input/app-input"
import { MainHeader } from "@/components/main-header"
import { Separator } from "@/components/ui/separator"

export default function Artists() {
  return (
    <div className="flex flex-col px-4">
      {/* Page Header: Header + Search Input on the same row */}
      <div className="flex items-center">
        <MainHeader headertext="Artists" />
        <AppInput placeholder="Artists..." buttonLabel="Search" />
      </div>

      {/* Separator */}
      <Separator orientation="horizontal" className="w-full mt-2 mb-4" />

      {/* Search Results */}
      <div className="flex flex-col ml-4">
        <p className="text-muted-foreground">No results yet...</p>
      </div>
    </div>
  )
}
