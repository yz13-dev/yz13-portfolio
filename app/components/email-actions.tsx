import { email, emailTo } from "@/const/socials";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/utils";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import Availability from "./availability";
import CopyButton from "./copy-button";




export default function () {

  const [hoveredText, setHoveredText] = useState<string | null>(null);

  const copyText = "Скопировать в буфер обмена"
  const emailToText = "Открыть приложение почты"

  return (
    <div className="flex flex-col gap-1 pb-6">
      <Availability />
      <div className="flex items-center py-2 gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            asChild
            onMouseEnter={() => setHoveredText(emailToText)}
            onMouseLeave={() => setHoveredText(null)}
          >
            <Link to={emailTo(email)}>
              <MailIcon />
            </Link>
          </Button>
          <CopyButton
            onMouseEnter={() => setHoveredText(copyText)}
            onMouseLeave={() => setHoveredText(null)}
            value={email}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Пишите на почту</span>
          <span className={cn(
            "text-xs text-muted-foreground transition-colors",
            !!hoveredText && "text-foreground"
          )}
          >
            {
              hoveredText
                ? hoveredText
                : "Даже если занят"
            }
          </span>
        </div>
      </div>
    </div>
  )
}
