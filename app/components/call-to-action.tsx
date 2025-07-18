import { Link } from "@remix-run/react"
import { Button } from "@yz13/ui/button"
import { PhoneCallIcon, SendIcon } from "lucide-react"



export default function ({ enabled = false }: { enabled?: boolean }) {
  const chat = "https://t.me/yz13_dev"
  return (
    <>
      <Button
        disabled
        variant={enabled ? "default" : "secondary"}
        size="lg"
      >
        <PhoneCallIcon />
        Запланировать видеозвонок
      </Button>
      <Button
        variant={enabled ? "secondary" : "default"}
        size="lg"
        asChild
      >
        <Link to={chat}>
          <SendIcon />
          <span>Перейти в чат</span>
        </Link>
      </Button>
    </>
  )
}
