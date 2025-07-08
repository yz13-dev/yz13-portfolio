import { availableForWork } from "@/flags/flags"
import { Button } from "@yz13/ui/button"
import { PhoneCallIcon, SendIcon } from "lucide-react"
import Link from "next/link"



export default async function () {
  const available = await availableForWork()

  const chat = "https://t.me/yz13-dev"
  return (
    <>
      <Button
        disabled
        variant={available ? "default" : "secondary"}
        size="lg"
      >
        <PhoneCallIcon />
        Запланировать видеозвонок
      </Button>
      <Button
        variant={available ? "secondary" : "default"}
        size="lg"
        asChild
      >
        <Link href={chat}>
          <SendIcon />
          Чат
        </Link>
      </Button>
    </>
  )
}
