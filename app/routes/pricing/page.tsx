import DitheringBackground from "@/components/dithering-background"
import { Logo } from "@/components/logo"
import { useMobile } from "@/hooks/use-mobile"
import { formatPrice } from "@/utils/pricing"
import { getV1Pricing } from "@yz13/api"
import { GetV1Pricing200Item } from "@yz13/api/types"
import { Button } from "@yz13/ui/button"
import { ArrowRightIcon, CheckIcon, MinusIcon } from "lucide-react"
import { Link, useLoaderData } from "react-router"

type Pricing = GetV1Pricing200Item;

export const loader = async () => {
  try {
    const pricing = await getV1Pricing();

    const sorted = pricing
      .sort((a, b) => {
        const aPricing = a.price;
        const bPricing = b.price;
        return aPricing - bPricing
      })

    return { pricing: sorted }
  } catch (error) {
    console.error(error)
    return { pricing: [] }
  }
}

export function HydrateFallback() {
  return (
    <>
      <header className="max-w-[1600px] h-14 px-6 mx-auto">
        <div className="border-x w-full h-full flex items-center px-6">
          <Link to="/">
            <Logo size={28} type="full" />
          </Link>
        </div>
      </header>
      <div className="max-w-[1600px] divide-y px-6 mx-auto">
        <div className="p-6 border">
          <div className="*:block space-y-2">
            <h1 className="text-4xl font-semibold">
              Цены
            </h1>
            <p className="text-2xl text-muted-foreground">
              От компонентов до MVP
            </p>
          </div>
        </div>
        <div className="w-full h-[400px] border-x relative">
          <DitheringBackground className="h-full w-full" withGradientOverylay={false} />
        </div>
      </div>
    </>
  )
}

export default function () {
  const { pricing } = useLoaderData<typeof loader>();

  return (
    <>
      <header className="max-w-[1600px] h-14 px-6 mx-auto">
        <div className="border-x w-full h-full flex items-center px-6">
          <Link to="/">
            <Logo size={28} type="full" />
          </Link>
        </div>
      </header>
      <div className="max-w-[1600px] divide-y px-6 mx-auto">
        <div className="p-6 border">
          <div className="*:block space-y-2">
            <h1 className="text-4xl font-semibold">
              Цены
            </h1>
            <p className="text-2xl text-muted-foreground">
              От компонентов до MVP
            </p>
          </div>
        </div>
        <div className="w-full h-[400px] border-x relative">
          <DitheringBackground className="h-full w-full" withGradientOverylay={false} />
        </div>
        <div className="w-full divide-y *:border-x border-b">
          <div className="lg:grid hidden grid-cols-7 w-full *:h-full divide-x *:p-3">
            <div className="w-full h-full">
              <span className="text-base text-muted-foreground font-normal">
                Опции и описание
              </span>
            </div>
            {
              pricing
                .map((price, index) => {

                  const isFourth = index === 3

                  return (
                    <div
                      key={price.id}
                      className="w-full flex 2xl:flex-row flex-col 2xl:items-center items-start shrink-0 justify-between 2xl:gap-3 gap-1.5 h-fit"
                    >
                      <div className="*:block xl:space-y-1 space-y-0 shrink-0">
                        <span className="xl:text-base text-sm line-clamp-1 text-muted-foreground font-medium">{price.name}</span>
                        <span className="block xl:text-2xl text-lg font-medium">
                          От {formatPrice(price.price)}
                        </span>
                      </div>
                      <Button
                        className="2xl:w-fit w-full"
                        variant={isFourth ? "default" : "outline"}
                        disabled
                      >
                        <span className="2xl:hidden inline">Заказать</span>
                        <ArrowRightIcon />
                      </Button>
                    </div>
                  )
                })
            }
          </div>
          <PricingRow
            label="Доступ к репозиторию"
            priceId="repo"
            pricing={pricing}
          />
          <PricingRow
            label="Базовое SEO"
            priceId="seo-base"
            pricing={pricing}
          />
          <PricingRow
            label="Адаптация под мобильные устройства"
            priceId="mobile-opt"
            pricing={pricing}
          />
        </div>
      </div>
    </>
  )
}


const PricingRow = ({ pricing = [], label, priceId }: {
  pricing?: Pricing[],
  label?: string, priceId: string
}) => {

  const isModile = useMobile();

  const row = pricing
    .map(price => {
      const extra = price.details.filter(item => item.id === priceId)
      return extra[0];
    })

  if (isModile) {
    return (
      <div className="divide-y *:h-9 *:px-4">
        <div className="w-full flex items-center">
          <span className="text-base text-muted-foreground font-normal">
            {label}
          </span>
        </div>
        {
          pricing
            .map((price, index) => {
              const extra = price.details.filter(item => item.id === priceId)[0];

              const name = price.name;

              if (!extra)
                return (
                  <div key={`item/${index}`} className="w-full flex items-center *:w-1/2">
                    <div><span>{name}</span></div>
                    <div>
                      <MinusIcon size={16} />
                    </div>
                  </div>
                )

              const isFree = !extra.price && !extra.price_per_item;

              return (
                <div key={`${extra.id}/${index}`} className="w-full flex items-center *:w-1/2">
                  <div><span>{name}</span></div>
                  <div>
                    {
                      isFree
                        ? <CheckIcon size={16} />
                        : <span className="block text-3xl font-medium">{formatPrice(extra.price ?? extra.price_per_item ?? 0)}</span>
                    }
                  </div>
                </div>
              )
            })
        }
      </div>
    )
  }
  return (
    <div className="grid grid-cols-7 w-full *: h-full divide-x *:p-3">
      <div className="w-full">
        <span className="text-base text-muted-foreground font-normal">
          {label}
        </span>
      </div>
      {
        row
          .map((extra, index) => {


            if (!extra) return (
              <div key={`item/${index}`} className="w-full space-y-4">
                <MinusIcon />
              </div>
            )

            const isFree = !extra.price && !extra.price_per_item;

            return (
              <div key={`${extra.id}/${index}`} className="w-full space-y-4">
                {
                  isFree
                    ? <CheckIcon />
                    : <span className="block text-3xl font-medium">{formatPrice(extra.price ?? extra.price_per_item ?? 0)}</span>
                }
              </div>
            )
          })
      }
    </div>
  )
}
