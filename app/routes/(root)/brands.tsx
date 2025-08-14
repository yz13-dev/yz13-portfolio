import { cn } from "@yz13/ui/utils"
import { PlusIcon } from "lucide-react"

const brands = [
  { type: 'square', id: 1 },
  { type: 'video', id: 2 },
  { type: 'square', id: 3 },
  { type: 'square', id: 4 },
  { type: 'video', id: 5 },
  { type: 'square', id: 6 },
  { type: 'square', id: 7 },
  { type: 'video', id: 8 },
  { type: 'square', id: 9 },
  { type: 'square', id: 10 },
  { type: 'video', id: 11 },
  { type: 'square', id: 12 },
  { type: 'square', id: 13 },
  { type: 'video', id: 14 },
  { type: 'square', id: 15 },
]

const NewBrand = ({ label }: { label: string }) => {
  return (
    <div
      className="rounded-sm bg-secondary h-16 flex items-center justify-center group"
    >
      <span className={cn(
        "font-medium flex gap-2 items-center justify-center text-base text-muted-foreground",
        "group-hover:opacity-100 opacity-0 transition-opacity"
      )}>
        <PlusIcon size={18} />
        {label}
      </span>
    </div>
  )
}

export const Brands = () => {
  return (
    <div className="w-full py-12">
      <div className="w-full max-w-[1600px] mx-auto grid lg:grid-cols-3 grid-cols-1 px-6 gap-6">

        <NewBrand label="Стать спонсором" />
        <NewBrand label="Стать партнером" />
        <NewBrand label="Стать заказчиком" />

      </div>
    </div>
  )
  // return (
  //   <div className="w-full py-12">
  //     <div className="w-full h-16 max-w-[1600px] mx-auto overflow-hidden infinite-scroll-container">
  //       <div className="h-full flex w-max items-center gap-3 infinite-scroll-track">
  //         {
  //           [...brands, ...brands]
  //             .map((brand) => (
  //               <div
  //                 key={brand.id}
  //                 className={`h-full ${brand.type === 'video' ? 'aspect-video' : 'aspect-square'} bg-secondary rounded-sm`}
  //               />
  //             ))
  //         }
  //       </div>
  //     </div>
  //   </div>
  // )
}
