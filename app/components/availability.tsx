import { randomNumber } from "@/utils/random-number";
import { TypingText } from "@yz13/ui/animated/typing";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { useEffect, useMemo, useState } from "react";

type AvailabilityProps = {
  enabled?: boolean
  className?: string;
  size?: "sm" | "default" | "lg";
  animated?: boolean;
};

const availableTexts = [
  "Открыт для заказов",
  "Закажите какой-нибудь проект",
  "Готов к новым задачам",
  "Жду ваши идеи",
  "Свободен для сотрудничества",
  "Можно заказать проект",
  "Есть время на новые заказы"
];

const unavailableTexts = [
  "Работаю над заказами",
  "Есть пара заказов",
  "Делаю вид что работаю",
  "Занят выполнением проектов",
  "Нет свободного времени",
  "Временно перегружен",
  "В тисках дедлайнов",
  "Завален работой"
];

const Availability = ({
  enabled = false,
  className = "",
  size = "default",
  animated = true
}: AvailabilityProps) => {
  const [ready, setReady] = useState<boolean>(false)

  const status: "available" | "unavailable" = enabled
    ? "available"
    : "unavailable";

  const animatedText = status === "available"
    ? availableTexts
    : unavailableTexts;
  const randomText = useMemo(() => {
    return status === "available"
      ? availableTexts[randomNumber(0, availableTexts.length - 1)]
      : unavailableTexts[randomNumber(0, unavailableTexts.length - 1)]
  }, [status])

  const text = animated ? animatedText : randomText;

  useEffect(() => {
    setReady(true)
  }, [])
  return (
    <div
      data-size={size}
      className={cn(
        "w-fit group flex items-center bg-background gap-2 rounded-full border",
        "data-[size=sm]:px-2.5 data-[size=sm]:py-0.5",
        "data-[size=default]:px-3 data-[size=default]:py-1",
        "data-[size=lg]:px-4 data-[size=lg]:py-1.5",
        className,
      )}
    >
      <div
        data-status={status}
        className={cn(
          "group relative",
          "group-data-[size=sm]:size-1",
          "group-data-[size=default]:size-2",
          "group-data-[size=lg]:size-3",
        )}>
        <div
          className={cn(
            "absolute inset-0 animate-ping rounded-full",
            "group-data-[status=available]:bg-foreground",
            "group-data-[status=unavailable]:bg-destructive",
            "group-data-[size=sm]:size-1",
            "group-data-[size=default]:size-2",
            "group-data-[size=lg]:size-3",
          )}
        />
        <div className={cn(
          "animate-pulse rounded-full",
          "group-data-[status=available]:bg-foreground",
          "group-data-[status=unavailable]:bg-destructive",
          "group-data-[size=sm]:size-1",
          "group-data-[size=default]:size-2",
          "group-data-[size=lg]:size-3",
        )} />
      </div>
      <div data-status={status} className={cn(
        "flex items-center gap-1",
        "data-[status=available]:text-foreground",
        "data-[status=unavailable]:text-muted-foreground",
      )}>
        {
          ready
            ?
            animated
              ?
              <TypingText
                text={text}
                duration={100}
                loop={true}
                className={cn(
                  "group-data-[size=sm]:text-xs",
                  "group-data-[size=default]:text-sm",
                  "group-data-[size=lg]:text-base",
                )}
              />
              : <span
                className={cn(
                  "group-data-[size=sm]:text-xs",
                  "group-data-[size=default]:text-sm",
                  "group-data-[size=lg]:text-base",
                )}
              >
                {text}
              </span>
            : <span
              className={cn(
                "group-data-[size=sm]:text-xs",
                "group-data-[size=default]:text-sm",
                "group-data-[size=lg]:text-base",
              )}
            >

            </span>
        }
      </div>
    </div>
  );
};

export const AvailabilitySkeleton = ({ size = "default", className = "" }: { size?: AvailabilityProps["size"], className?: string }) => {
  return (
    <Skeleton
      data-size={size}
      className={cn(
        "w-48 rounded-full",
        "data-[size=sm]:h-[22px]",
        "data-[size=default]:h-[30px]",
        "data-[size=lg]:h-[38px]",
        className
      )}
    />
  );
};
export default Availability;
