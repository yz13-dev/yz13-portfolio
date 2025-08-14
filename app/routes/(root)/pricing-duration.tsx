import { formatDuration } from "@/utils/pricing-durations"
import { Badge } from "@yz13/ui/badge"
import { Skeleton } from "@yz13/ui/skeleton"
import { memo } from "react"
import type { Pricing } from "./page"

const Grid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 *:px-3 *:py-1 *:h-11">
      {children}
    </div>
  )
}

type Props = {
  pricing: Pricing[]
}

export const PricingDurationError = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center">
      <span>Ошибка при загрузке</span>
    </div>
  )
}

export const PricingDurationSkeleton = () => {
  const badges = Array.from({ length: 6 }).map((_, index) => index)
  return (
    <Grid>
      {
        badges.map(badge =>
          <Skeleton key={`duration/skeleton/${badge}`} className="h-9 w-full" />
        )
      }
    </Grid>
  )
}

const PricingDuration = memo(({ pricing }: Props) => {
  return (
    <Grid>
      {
        pricing
          .map(price => {
            const duration = formatDuration(price.duration);
            return (
              <Badge key={price.id} variant="outline" className="flex items-center bg-card justify-between w-full">
                <span className="lg:text-2xl text-lg font-medium">{price.name}</span>
                <span className="ld:text-base text-sm text-muted-foreground/60">От {duration}</span>
              </Badge>
            )
          })
      }
    </Grid>
  )
})

export default PricingDuration;
