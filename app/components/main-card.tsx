import useIsMac from "@/hooks/use-is-mac";
import { Link } from "@remix-run/react";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { cn } from "@yz13/ui/utils";
import { ChevronDownIcon, SearchIcon, SettingsIcon } from "lucide-react";
import { motion } from "motion/react";
import Availability from "./availability";
import CallToAction from "./call-to-action";
import { Logo } from "./logo";
import Modal from "./settings/modal";

type Props = {
  available?: boolean,
  settings?: boolean,
  command?: boolean,
  className?: string
}

export default function ({ available = false, command = false, settings = false, className = "" }: Props) {
  const isMac = useIsMac()
  return (
    <motion.main
      transition={{ duration: 0.2 }}
      className={cn("w-full space-y-4 bg-card/40 rounded-4xl p-4", className)}
    >
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex items-center gap-2">
          <Logo size={48} type="icon" />
          <h1 className="text-4xl font-pixel font-medium">YZ13</h1>
        </div>
        <div className="flex items-center gap-2">
          {
            command &&
            <Button variant="secondary">
              <SearchIcon />
              <span className="text-sm font-mono">
                <kbd>{isMac ? "Cmd + K" : "Ctrl + K"}</kbd>
              </span>
            </Button>
          }
          {
            settings &&
            <Modal>
              <Button variant="secondary" size="icon"><SettingsIcon /></Button>
            </Modal>
          }
          <Button variant="secondary" size="icon">
            <ChevronDownIcon />
          </Button>
        </div>
      </div>

      <div>
        <p className="block text-muted-foreground">Фронтенд разработчик, специализируюсь на&nbsp;разработке сайтов, веб-приложений.</p>
      </div>

      <Separator />

      <div className="w-full max-w-xs">
        <Availability className="bg-transparent !px-0 !py-0 border-0" size="sm" enabled={available} />
        <div className="w-full">
          <span className="text-muted-foreground text-center text-xs">
            По вопросам и/или предложениям пишите:
          </span>
          <div className="flex items-center gap-1.5 text-xs">
            <Link to="mailto:yz13.dev@gmail.com" className="font-medium text-foreground hover:underline">yz13.dev@gmail.com</Link>
            <span className="text-muted-foreground">или</span>
            <Link to="mailto:yztheceo@yandex.ru" className="font-medium text-foreground hover:underline">yztheceo@yandex.ru</Link>
          </div>
        </div>
      </div>

      <div className={cn(
        "flex gap-4 items-center flex-col",
        "*:w-full *:h-12 *:text-base [&>svg]:!size-[18]"
      )}>
        <CallToAction enabled={available} />
      </div>
    </motion.main>
  )
}
