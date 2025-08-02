import type { Route } from ".react-router/types/app/routes/auth/signin/+types/page";
import DitheringBackground from "@/components/dithering-background";
import { Logo } from "@/components/logo";
import { ProjectLogo } from "@/components/projects";
import { getV1StoreId, postV1AuthLogin } from "@yz13/api";
import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import { Loader2Icon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { Link, redirect, useLoaderData, useNavigate } from "react-router";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const appId = searchParams.get("appId")

  if (!appId) return { app: null }

  const next = searchParams.get("next")
  const app = await getV1StoreId(appId)

  if (!next && app?.public_url) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("next", app.public_url)
    const route = `${url.pathname}?${newSearchParams.toString()}`
    return redirect(route)
  }
  return { app }

}

export default function () {
  const { app } = useLoaderData<typeof loader>();

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
        <div className="md:w-1/2 w-full md:h-full h-fit pt-20 relative">
          <div className="flex items-start gap-1 absolute top-6 left-6">
            <Logo size={48} type="icon" className="size-12" />

            {
              app &&
              <div className="size-9 flex items-center justify-center">
                <span>X</span>
              </div>
            }


            {
              app &&
              <div className="h-9 min-w-9 relative border rounded-lg">
                <ProjectLogo project={app} />
              </div>
            }

          </div>
          <div className="px-6 pb-6 h-full space-y-2">
            <h1 className="text-3xl font-semibold block">
              Вход {app ? `в ${app.name}` : null}
            </h1>
            <p className="text-lg block text-muted-foreground">
              Используйте аккаунт YZ13.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full md:h-full h-fit pt-20 relative">
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
