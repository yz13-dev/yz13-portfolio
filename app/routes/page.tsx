import Availability from "@/components/availability";
import Blog from "@/components/blog";
import GithubContributions from "@/components/github-contributions";
import { Logo } from "@/components/logo";
import Projects from "@/components/projects";
import Socials from "@/components/socials";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { CopyIcon, MailIcon } from "lucide-react";

export default function () {
  return (
    <div className="max-w-md w-full mx-auto pt-[10%] px-6">
      <header className="py-6">
        <Logo type="full" />
      </header>
      <main className="w-full *:block space-y-1">
        <h1 className="text-2xl font-medium">Создаю интерфейсы, которые работают на результат</h1>
        <p className="text-lg text-muted-foreground">Специализируюсь на React-экосистеме: от лендингов до сложных веб-приложений</p>
      </main>
      <div className="py-6">
        <Separator />
      </div>
      <div className="flex flex-col gap-1 pb-6">
        <Availability />
        <div className="flex items-center gap-2 py-2">
          <Button variant="outline" size="icon"><MailIcon /></Button>
          <Button variant="outline" size="icon"><CopyIcon /></Button>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Пишите на почту</span>
            <span className="text-xs text-muted-foreground">Даже если занят</span>
          </div>
        </div>
      </div>
      <div className="w-full pb-6">
        <GithubContributions username="yz13-dev" />
      </div>
      <section className="w-full pb-6">
        <div className="w-full">
          <h3 className="text-base font-medium">Социальные сети</h3>
        </div>
        <ul className="py-4">
          <Socials />
        </ul>
      </section>
      <section className="w-full pb-6">
        <div className="w-full">
          <h3 className="text-base font-medium">Проекты</h3>
        </div>
        <ul className="py-4">
          <Projects />
        </ul>
      </section>
      <section className="w-full pb-6">
        <div className="w-full">
          <h3 className="text-base font-medium">Блог</h3>
        </div>
        <ul className="py-4">
          <Blog />
        </ul>
      </section>
    </div>
  )
}
