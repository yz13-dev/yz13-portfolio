import { formatDuration } from "@/utils/pricing-durations"
import { Badge } from "@yz13/ui/badge"
import { Skeleton } from "@yz13/ui/skeleton"
import type { Pricing } from "./page"



type Props = {
  pricing: Pricing[]
}

export const PricingDurationSkeleton = () => {
  const badges = Array.from({ length: 6 }).map((_, index) => index)
  return (
    <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 *:h-9 *:px-3">
      {
        badges.map(badge =>
          <Skeleton key={`duration/skeleton/${badge}`} className="h-9 w-full" />
        )
      }
    </div>
  )
}

export default function ({ pricing }: Props) {
  return (
    <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 *:h-9 *:px-3">
      {
        pricing
          .sort((a, b) => {
            const aDuration = a.duration.reduce((acc, val) => acc + val, 0)
            const bDuration = b.duration.reduce((acc, val) => acc + val, 0)
            return aDuration - bDuration
          })
          .map(price => {
            const duration = formatDuration(price.duration);
            return (
              <Badge key={price.id} variant="outline" className="flex items-center justify-between w-full">
                <span className="text-base font-medium">{price.name}</span>
                <span className="text-sm text-muted-foreground/60">От {duration}</span>
              </Badge>
            )
          })
      }
    </div>
  )
}
