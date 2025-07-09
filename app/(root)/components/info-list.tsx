import { getInfoList } from "@/flags/flags";
import { Skeleton } from "@yz13/ui/skeleton";

export const InfoListSkeleton = () => {
  return (
    <div className="space-y-2 *:shrink-0 *:h-[24px]">
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
    </div>
  )
}

export default async function () {

  const list = await getInfoList()

  return (
    <ol className="list-inside list-decimal text-sm/6 text-left space-y-2">
      {
        list
          .map((item, index) => {

            const key = `row-item-${index}`

            return (
              <li key={key} className="tracking-[-.01em]">
                <span>{item}</span>
              </li>
            );
          })
      }
    </ol>
  )
}
