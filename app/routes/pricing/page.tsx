import DitheringBackground from "@/components/dithering-background"
import { Logo } from "@/components/logo"
import { formatPrice } from "@/utils/pricing"
import { getV1Pricing } from "@yz13/api"
import { GetV1Pricing200Item } from "@yz13/api/types"
import { Button } from "@yz13/ui/button"
import { Link, redirect, useLoaderData } from "react-router"

type Pricing = GetV1Pricing200Item;

export const loader = async () => {
  try {

    const isProd = import.meta.env.PROD;

    if (isProd) return redirect("/")

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
        <div className="w-full divide-y *:border-x">
          <div className="grid grid-cols-7 w-full divide-x *:p-3">
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
                    <div key={price.id} className="w-full space-y-4 h-fit">
                      <div className="*:block space-y-1">
                        <span className="text-2xl text-muted-foreground font-medium block">{price.name}</span>
                        <span className="block text-3xl font-medium">{formatPrice(price.price)}</span>
                      </div>
                      <Button className="w-full" variant={isFourth ? "default" : "outline"}>Заказать</Button>
                    </div>
                  )
                })
            }
          </div>
          <PricingRow
            label="Дополнительные элементы к заказу"
            priceId="extra"
            pricing={pricing}
          />
          <PricingRow
            label="Доступ к репозиторию"
            priceId="repo"
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

  const row = pricing
    .map(price => {
      const extra = price.details.filter(item => item.id === priceId)
      return extra[0];
    })
    .filter(item => item !== undefined)

  return (
    <div className="grid grid-cols-7 w-full divide-x *:p-3">
      <div className="w-full h-full">
        <span className="text-base text-muted-foreground font-normal">
          {label}
        </span>
      </div>
      {
        row
          .map((extra, index) => {
            return (
              <div key={`${extra.id}/${index}`} className="w-full space-y-4 h-fit">
                <span className="block text-3xl font-medium">{formatPrice(extra.price ?? extra.price_per_item ?? 0)}</span>
              </div>
            )
          })
      }
    </div>
  )
}
