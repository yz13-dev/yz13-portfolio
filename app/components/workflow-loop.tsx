import { Progress } from "@yz13/ui/progress";
import { cn } from "@yz13/ui/utils";
import { useInterval } from "ahooks";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const LOOP_DURATION = 1000;

export default function () {

  const [index, setIndex] = useState(0);

  const list = [
    {
      title: "Ознакомительный видеозвонок",
      content: "Обсуждение проекта, работы над ним и т.д.",
    },
    {
      title: "Разработка",
      content: "После определения плана разработки, начинается разработка.",
    },
    {
      title: "Передача конечного результата",
      content: "Внесение поправок (при наличии), передача архива или трансфер репозитория, подтверждение результата.",
    },
  ]

  return list
    .map(
      (item, i) => <WorkflowLoopItem
        key={`workflow/${i}`}
        activeIndex={index}
        onActiveIndexChange={setIndex}
        content={item.content}
        index={i}
        title={item.title}
        onProgressEnd={() => {
          if (index !== i) return;
          if (index === list.length - 1) {
            setIndex(0);
          } else setIndex(index + 1);
        }}
      />
    )
}

const WorkflowLoopItem = ({
  activeIndex,
  onActiveIndexChange,
  onProgressEnd,
  index,
  title,
  content,
}: {
  onProgressEnd?: () => void,
  activeIndex: number,
  onActiveIndexChange: (index: number) => void,
  index: number,
  title: string,
  content: string
}) => {

  const [progress, setProgress] = useState<number>(0);

  useInterval(() => {
    if (progress < 100) setProgress(progress + 1);
    else if (activeIndex === index) onProgressEnd?.();
  }, (LOOP_DURATION / 10));
  useEffect(() => {
    if (activeIndex === index) setProgress(0);
  }, [activeIndex, index])
  return (
    <div
      className={cn(
        "w-full flex flex-row gap-3 p-3 hover:bg-secondary/40 transition-colors rounded-md hover:cursor-pointer",
        activeIndex === index && "bg-secondary/40"
      )}
      onPointerEnter={() => onActiveIndexChange(index)}
    >
      <div className="size-12 flex shrink-0 items-center justify-center bg-muted rounded-sm border">
        {index + 1}
      </div>
      <div className="w-full">
        <AnimatePresence>
          {
            (activeIndex === index) &&
            <motion.div
              initial={{ opacity: 0, height: 0, filter: "blur(6px)", top: -6 }}
              animate={{ opacity: 1, height: 16, filter: "blur(0px)", top: 0 }}
              exit={{ opacity: 0, height: 0, filter: "blur(6px)", top: -6 }}
              transition={{ duration: 0.2 }}
              className="w-full relative"
            >
              <Progress value={progress} aria-readonly={true} />
            </motion.div>
          }
        </AnimatePresence>
        <div className="w-full *:block space-y-0">
          <span className="text-xl font-medium">{title}</span>
          <span className="text-sm text-muted-foreground">{content}</span>
        </div>
      </div>
    </div>
  )
}
