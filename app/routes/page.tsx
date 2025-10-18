import Blog from "@/components/blog";
import EmailActions from "@/components/email-actions";
import GithubContributions from "@/components/github-contributions";
import { Logo } from "@/components/logo";
import LogoSvg from "@/components/logo-svg";
import Projects from "@/components/projects";
import Socials from "@/components/socials";
import { Separator } from "@yz13/ui/separator";

export default function () {
  return (
    <div className="max-w-md w-full mx-auto pt-[10%] *:px-6">
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
      <EmailActions />
      <div className="w-full pb-6">
        <GithubContributions username="yz13-dev" />
      </div>
      <section className="w-full pb-6">
        <div className="w-full">
          <h3 className="text-base text-muted-foreground font-medium">Социальные сети</h3>
        </div>
        <ul className="py-4">
          <Socials />
        </ul>
      </section>
      <section className="w-full pb-6">
        <div className="w-full">
          <h3 className="text-base text-muted-foreground font-medium">Проекты</h3>
        </div>
        <ul className="py-4">
          <Projects />
        </ul>
      </section>
      <section className="w-full pb-6">
        <div className="w-full">
          <h3 className="text-base text-muted-foreground font-medium">Блог</h3>
        </div>
        <ul className="py-4">
          <Blog />
        </ul>
      </section>
      <footer className="w-full space-y-2 pb-6">
        <LogoSvg className="opacity-10" />
      </footer>
    </div>
  )
}
