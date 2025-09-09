import { formatPrice } from "@/utils/pricing"
import { formatDuration } from "@/utils/pricing-durations"
import { Badge } from "@yz13/ui/badge"
import { Button } from "@yz13/ui/button"
import { Skeleton } from "@yz13/ui/skeleton"
import { ArrowRightIcon, NotebookTabsIcon } from "lucide-react"
import { memo } from "react"
import { Link } from "react-router"
import type { Pricing } from "./page"
import { SectionTitle } from "./section"

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

  const cheapest = pricing.sort((a, b) => a.price - b.price)[0];

  return (
    <div className="w-full space-y-8">
      <div className="h-full flex flex-col justify-center gap-6">
        <SectionTitle className="shrink-0">
          Цены начинаются
          от {formatPrice(cheapest.price ?? 0)}
        </SectionTitle>
        <div className="flex items-center sm:flex-row flex-col sm:*:w-fit *:w-full md:gap-4 gap-2">
          <Button className="h-12 md:text-lg text-base w-fit [&>svg]:!size-5" size="lg" asChild>
            <Link to="/pricing" prefetch="render">
              <NotebookTabsIcon />
              Цены
            </Link>
          </Button>
          <Button className="h-12 md:text-lg text-base w-fit [&>svg]:!size-5" size="lg" variant="secondary" disabled>
            Запланировать видеозвонок
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
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
    </div>
  )
})

export default PricingDuration;
