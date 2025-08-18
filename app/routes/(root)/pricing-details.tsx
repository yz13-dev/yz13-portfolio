import DitheringBackground from "@/components/dithering-background";
import { formatPrice } from "@/utils/pricing";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { ArrowDownIcon, ArrowRightIcon, ChevronRightIcon, NotebookTabsIcon } from "lucide-react";
import { Link } from "react-router";
import type { Pricing } from "./page";
import { SectionTitle } from "./section";


type Props = {
  pricing: Pricing[]
}

export const PricingDetailsError = () => {
  return (
    <>
      <div className="w-full flex gap-2 items-center justify-between">
        <span className="shrink-0 text-muted-foreground">Цены начинаются от</span>
        <div className="w-full md:flex hidden items-center pl-3">
          <Separator className="shrink !h-[2px] !bg-muted" />
          <ChevronRightIcon className="text-muted relative -left-3" />
        </div>
        <Button size="lg">{(0).toLocaleString()} <ArrowDownIcon className="animate-bounce" /></Button>
      </div>
      <div className="w-full aspect-video flex items-center justify-center">
        <span>Ошибка при загрузке</span>
      </div>
    </>
  )
}

export const PricingDetailsSkeleton = () => {

  return (
    <>
      <div className="w-full flex gap-2 items-center justify-between">
        <SectionTitle className="shrink-0 text-muted-foreground">Цены начинаются от</SectionTitle>
        <div className="w-full md:flex hidden items-center pl-3">
          <Separator className="shrink !h-[2px] !bg-muted" />
          <ChevronRightIcon className="text-muted relative -left-3" />
        </div>
        <Button size="lg">{formatPrice(0)} <ArrowDownIcon className="animate-bounce" /></Button>
      </div>
      {/*<SectionContent className="w-full grid xl:grid-cols-2 grid-cols-1 gap-3 *:rounded-xl">
        <Skeleton className="2xl:row-span-2 row-span-1 w-full h-96" />
        <Skeleton className="row-span-1 w-full h-full" />
        <Skeleton className="row-span-1 w-full h-full" />
        <Skeleton className="row-span-1 w-full h-full" />
        <Skeleton className="2xl:row-span-2 row-span-1 w-full h-96" />
        <Skeleton className="row-span-1 w-full h-full" />
      </SectionContent>*/}
    </>
  )
}

export default function ({ pricing }: Props) {

  const cheapest = pricing.sort((a, b) => a.price - b.price)[0];
  // const chunkedPricing = chunk(pricing, 3);

  return (
    <div className="w-full flex md:flex-row flex-col md:*:w-1/2 *:w-full">
      <div className="border-l">
        <div className="w-full md:h-[486px] h-fit py-12">
          <div className="md:py-36 py-12 md:px-24 px-6 border-y h-full flex flex-col gap-6">
            <SectionTitle className="shrink-0">
              Цены начинаются
              от {formatPrice(cheapest.price ?? 0)}
            </SectionTitle>
            <div className="flex items-center gap-4">
              <Button size="lg" asChild>
                <Link to="/pricing" prefetch="render">
                  <NotebookTabsIcon />
                  Цены
                </Link>
              </Button>
              <Button size="lg" variant="secondary" disabled>
                Запланировать видеозвонок
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-x">
        <div className="h-[486px] py-12">
          <div className="w-full h-full border-y">
            <div className="relative w-full h-full overflow-hidden">
              <DitheringBackground className="h-full w-full scale-125" size="sm" withGradientOverylay={false} />
            </div>
          </div>
        </div>
      </div>
      {/*<div className="w-full md:flex hidden items-center pl-3">
        <Separator className="shrink !h-[2px] !bg-muted-foreground" />
        <ChevronRightIcon className="text-muted-foreground relative -left-3" />
      </div>
      <Button size="lg" asChild>
        <Link to="/pricing">
          {formatPrice(cheapest.price ?? 0)} <ArrowRightIcon />
        </Link>
      </Button>*/}
    </div>
  )
}
