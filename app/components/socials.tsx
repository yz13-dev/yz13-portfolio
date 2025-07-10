import { Button } from "@yz13/ui/button";
import { Link2Icon } from "lucide-react";



export default function () {
  return (
    <div className="flex flex-col items-center gap-6 max-w-sm">
      <div className="flex flex-row gap-2">
        <Button size="sm" variant="ghost"><Link2Icon /></Button>
        <Button size="sm" variant="ghost"><Link2Icon /></Button>
        <Button size="sm" variant="ghost"><Link2Icon /></Button>
        <Button size="sm" variant="ghost"><Link2Icon /></Button>
      </div>
      <span className="text-muted-foreground text-center max-w-xs text-xs">
        По вопросам и/или предложениям пишите: <span className="font-medium text-foreground">yz13.dev@gmail.com</span> или <span className="font-medium text-foreground">yztheceo@yandex.ru</span>
      </span>
    </div>
  )
}
