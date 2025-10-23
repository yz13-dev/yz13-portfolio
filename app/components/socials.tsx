import { github, telegram, x } from "@/const/socials";
import { Badge } from "@yz13/ui/badge";
import { ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router";



export default function () {
  return (
    <>
      <li className="w-full group flex items-center justify-start gap-2 py-2 relative">
        <Link to={telegram} className="absolute inset-0" />
        <div className="flex items-center gap-2">
          <img src="https://cdn.simpleicons.org/telegram/000000/ffffff" className="size-5" width={20} height={20} alt="telegram" />
          <span className="text-base font-medium group-hover:underline">Telegram</span>
        </div>
        <span className="dashed-line" />
        <Badge variant="outline"><ExternalLinkIcon /></Badge>
      </li>
      <li className="w-full group flex items-center justify-start gap-2 py-2 relative">
        <Link to={github} className="absolute inset-0" />
        <div className="flex items-center gap-2">
          <img src="https://cdn.simpleicons.org/github/000000/ffffff" className="size-5" width={20} height={20} alt="github" />
          <span className="text-base font-medium group-hover:underline">Github</span>
        </div>
        <span className="dashed-line" />
        <Badge variant="outline"><ExternalLinkIcon /></Badge>
      </li>
      <li className="w-full group flex items-center justify-between gap-2 py-2 relative">
        <Link to={x} className="absolute inset-0" />
        <div className="flex items-center gap-2">
          <img src="https://cdn.simpleicons.org/x/000000/ffffff" className="size-5" width={20} height={20} alt="x" />
          <span className="text-base font-medium group-hover:underline">X</span>
        </div>
        <span className="dashed-line" />
        <Badge variant="outline"><ExternalLinkIcon /></Badge>
      </li>
    </>
  )
}
