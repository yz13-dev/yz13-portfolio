import { cn } from "@yz13/ui/utils";
import { ComponentProps, lazy } from "react";
import { Link } from "react-router";
import { Logo } from "./logo";
import { Time, TimeOffset } from "./time/time";
const Nav = lazy(() => import("@/components/nav"));
const User = lazy(() => import("@/components/user"));


type Props = ComponentProps<"header">;
export default function ({ className = "", ...props }: Props) {
  return (
    <header
      className={cn(
        "w-full flex items-center justify-between",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <Link to="/" className="md:hidden block">
          <Logo type="icon" size={36} />
        </Link>
        <Link to="/" className="md:block hidden">
          <Logo type="full" size={36} />
        </Link>
        <div className="md:flex hidden flex-col gap-0">
          <Time className="text-lg font-medium text-foreground" />
          <TimeOffset className="text-xs text-muted-foreground" />
        </div>
        <Nav />
      </div>
      <User />
    </header>
  )
}
