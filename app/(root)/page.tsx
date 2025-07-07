import Availability from "@/components/availability";
import Background from "@/components/background";
import { Logo } from "@/components/logo";
import Projects, { ProjectsSkeleton } from "@/components/projects";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { PhoneCallIcon, SendIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Background />
      <main className="flex flex-col h-[calc(100dvh-78px)] max-w-md mx-auto *:max-w-sm px-8 pt-8 gap-[32px] justify-center items-center sm:items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Logo size={48} type="icon" />
            <h1 className="text-4xl font-pixel font-medium">YZ13</h1>
          </div>

          <p className="block text-muted-foreground">Фронтенд разработчик, специализируюсь на&nbsp;разработке сайтов, веб-приложений.</p>
        </div>

        <div className="space-y-6 w-full">
          <section>
            <ol className="list-inside list-decimal text-sm/6 text-left">
              <li className="mb-2 tracking-[-.01em]">
                Фронтенд разработчик
              </li>
              <li className="tracking-[-.01em]">
                React, TypeScript, Tailwind CSS
              </li>
            </ol>
          </section>

          <Separator />

          <section className="space-y-3">
            <span className="block text-muted-foreground font-medium">Проекты</span>
            <Suspense fallback={<ProjectsSkeleton />}>
              <Projects />
            </Suspense>
          </section>
        </div>

        <div className="w-full max-w-xs">
          <span className="text-muted-foreground text-center text-xs">
            По вопросам и/или предложениям пишите:
          </span>
          <div className="flex items-center gap-2 text-xs">
            <Link href="mailto:yz13.dev@gmail.com" className="font-medium text-foreground hover:underline">yz13.dev@gmail.com</Link>
            <span className="text-muted-foreground">или</span>
            <Link href="mailto:yztheceo@yandex.ru" className="font-medium text-foreground hover:underline">yztheceo@yandex.ru</Link>
          </div>
        </div>

        <div className="flex gap-4 sm:mt-0 mt-auto items-center flex-col sm:*:w-fit *:w-full sm:flex-row w-full">
          <Button
            disabled
            variant="default"
            size="lg"
          >
            <PhoneCallIcon />
            Запланировать видеозвонок
          </Button>
          <Button
            variant="secondary"
            size="lg"
          >
            <SendIcon />
            Чат
          </Button>
        </div>
      </main>
      <footer className="absolute bottom-0 p-6 left-0 right-0 mx-auto flex flex-col items-center gap-6 max-w-md">
        <Availability className="bg-background/40" />
      </footer>
    </>
  );
}
