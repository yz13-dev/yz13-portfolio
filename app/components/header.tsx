import { cn } from "@yz13/ui/utils";
import { ComponentProps } from "react";
import { Link } from "react-router";
import { Logo } from "./logo";
import Nav from "./nav";
import { Time, TimeOffset } from "./time/time";
import User from "./user";


type Props = ComponentProps<"header">;
export default function ({ className = "", ...props }: Props) {
  return (
    <header
      className={cn(
        "w-full flex items-center justify-between",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Link to="/">
          <Logo type="full" size={36} />
        </Link>
        <div className="flex flex-col gap-0">
          <Time className="text-lg font-medium text-foreground" />
          <TimeOffset className="text-xs text-muted-foreground" />
        </div>
        <Nav className="md:block hidden" />
      </div>
      <User />
    </header>
  )
}
