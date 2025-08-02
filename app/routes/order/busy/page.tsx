import { Button } from "@yz13/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";


export default function () {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="w-full max-w-lg space-y-8">
        <div className="w-full space-y-2 *:block">
          <h1 className="text-2xl font-medium">
            В данный момент нет возможности запланировать видеозвонок
          </h1>
          <p className="text-muted-foreground">
            Попробуйте позже
          </p>
        </div>
        <Button asChild className="w-fit" variant="secondary" size="lg">
          <Link to="/">
            <ArrowLeftIcon />
            <span>Вернуться</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
