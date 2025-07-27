import DitheringBackground from "@/components/dithering-background";
import { Logo } from "@/components/logo";
import { postV1AuthLogin } from "@yz13/api";
import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import { Loader2Icon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function () {

  const [next] = useQueryState("next")

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)

  const nav = useNavigate()

  const login = async () => {
    setLoading(true)
    try {

      const result = await postV1AuthLogin({
        email,
        password
      })

      console.log(result)

      if (result) {
        nav(next ? next : "/")
      }

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-dvh relative flex flex-col items-center justify-center">
      <DitheringBackground />
      <div className="max-w-3xl w-full h-fit border bg-background flex md:flex-row flex-col rounded-4xl">
        <div className="md:w-1/2 w-full md:h-full h-1/2 pt-20 relative">
          <Logo size={48} type="icon" className="size-12 absolute top-6 left-6" />
          <div className="px-6 pb-6 h-full space-y-2">
            <h1 className="text-3xl font-semibold block">Вход</h1>
            <p className="text-lg block text-muted-foreground">
              Используйте аккаунт YZ13.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full md:h-full h-1/2 pt-20 relative">
          <div className="px-6 pb-6 h-full gap-4 flex flex-col justify-between">
            <Input
              placeholder="yz13@yz13.ru"
              className="h-10 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="******"
              className="h-10 text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="w-full">
            </div>
            <div className="flex items-center justify-end gap-3">
              {
                !loading &&
                <Button variant="ghost" asChild>
                  <Link to="/auth/signup">
                    Создать аккаунт
                  </Link>
                </Button>
              }
              <Button disabled={loading} onClick={login}>{loading && <Loader2Icon className="animate-spin" />}Продолжить</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
