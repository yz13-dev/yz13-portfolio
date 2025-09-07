import { formatPrice } from "@/utils/pricing";
import { Button } from "@yz13/ui/button";
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
    <div className="md:py-36 py-12 px-6 h-full flex flex-col justify-center gap-6">
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
  )
}
