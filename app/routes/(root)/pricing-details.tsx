import { chunk } from "@/utils/chunk";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { ArrowDownIcon, ArrowRightIcon, CheckIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import { Fragment } from "react";
import type { Pricing } from "./page";


type Props = {
  pricing: Pricing[]
}

export const PricingDetailsSkeleton = () => {

  return (
    <>
      <div className="w-full flex gap-2 items-center justify-between">
        <span className="shrink-0 text-2xl font-medium text-muted-foreground">Цены начинаются от</span>
        <div className="w-full md:flex hidden items-center pl-3">
          <Separator className="shrink !h-[2px] !bg-muted" />
          <ChevronRightIcon className="text-muted relative -left-3" />
        </div>
        <Button size="lg">{(0).toLocaleString()} ₽ <ArrowDownIcon className="animate-bounce" /></Button>
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3 *:rounded-xl">
        <Skeleton className="row-span-2 w-full h-96" />
        <Skeleton className="row-span-1 w-full h-full" />
        <Skeleton className="row-span-1 w-full h-full" />
        <Skeleton className="row-span-1 w-full h-full" />
        <Skeleton className="row-span-2 w-full h-96" />
        <Skeleton className="row-span-1 w-full h-full" />
      </div>
    </>
  )
}

export default function ({ pricing }: Props) {

  const cheapest = pricing.sort((a, b) => a.price - b.price)[0];
  const chunkedPricing = chunk(pricing, 3);

  return (
    <>
      <div className="w-full flex gap-2 items-center justify-between">
        <span className="shrink-0 text-2xl font-medium text-muted-foreground">Цены начинаются от</span>
        <div className="w-full md:flex hidden items-center pl-3">
          <Separator className="shrink !h-[2px] !bg-muted" />
          <ChevronRightIcon className="text-muted relative -left-3" />
        </div>
        <Button size="lg">{(cheapest.price ?? 0).toLocaleString()} ₽ <ArrowDownIcon className="animate-bounce" /></Button>
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3 *:rounded-xl">
        {
          chunkedPricing.map((chunk, index) => {
            const isOdd = index % 2 === 0;
            return (
              <Fragment key={`chunk/${index}`}>
                {
                  chunk
                    .map((pricing, priceIndex) => {
                      const isOddChunk = priceIndex === 0;
                      const isEvenChunk = priceIndex === 1;
                      const active = isOdd ? isOddChunk : isEvenChunk;
                      const details = pricing.details
                      return (
                        <div
                          key={pricing.id}
                          data-active={active}
                          className={cn(
                            "w-full flex flex-col group *:p-3 border",
                            isOdd
                              ? isOddChunk
                                ? "row-span-2 bg-foreground !border-foreground/60"
                                : "row-span-1 bg-card"
                              : isEvenChunk
                                ? "row-span-2 bg-foreground !border-foreground/60"
                                : "row-span-1 bg-card"
                          )}>
                          <div className={cn(
                            "w-full h-fit flex gap-2 rounded-lg justify-between",
                            active ? "flex-col" : "flex-row items-center",
                          )}>
                            <div className="w-full space-y-1 *:block">
                              <span className="text-2xl font-medium group-data-[active=true]:text-background">{pricing.name}</span>
                              <span className="text-base group-data-[active=true]:text-background/60 text-muted-foreground">{pricing.description}</span>
                            </div>
                            {
                              !active &&
                              <div className="gap-2 flex w-fit items-center flex-col">
                                <span className="text-2xl shrink-0 font-medium">{pricing.price.toLocaleString()} ₽</span>
                                <Button className="w-fit" size="lg" variant={active ? "secondary" : "default"}>
                                  Заказать
                                  <ArrowRightIcon />
                                </Button>
                              </div>
                            }
                          </div>
                          <div className="w-full h-fit">
                            <ul
                              className="*:py-2"
                            >
                              {
                                details
                                  .sort((a, b) => {
                                    const aHasPricing = !!a.price_per_item;
                                    const bHasPricing = !!b.price_per_item;
                                    if (aHasPricing && !bHasPricing) return -1;
                                    if (!aHasPricing && bHasPricing) return 1;
                                    return 0;
                                  })
                                  .map((detail, index) => {
                                    const hasPricing = !!detail.price_per_item;
                                    return (
                                      <li
                                        key={`${detail.type}/${index}`}
                                        className="flex items-center gap-2 group-data-[active=true]:text-background"
                                      >
                                        {
                                          hasPricing
                                            ? <PlusIcon size={16} className="shrink-0" />
                                            : <CheckIcon size={16} className="shrink-0" />
                                        }
                                        <span className="text-sm">{detail.label}</span>
                                        {
                                          hasPricing &&
                                          <span className="text-sm font-medium ml-auto">{(detail.price_per_item ?? 0).toLocaleString()} ₽</span>
                                        }
                                      </li>
                                    )
                                  })
                              }
                            </ul>
                          </div>
                          {
                            active &&
                            <div className="gap-2 w-full h-full flex justify-end items-start flex-col">
                              <span className="text-4xl shrink-0 font-medium group-data-[active=true]:text-background">{pricing.price.toLocaleString()} ₽</span>
                              <Button className="w-full" size="lg" variant={active ? "secondary" : "default"}>
                                Заказать
                                <ArrowRightIcon />
                              </Button>
                            </div>
                          }
                        </div>
                      )
                    })
                }
              </Fragment>
            )
          })
        }
      </div>
    </>
  )
}
