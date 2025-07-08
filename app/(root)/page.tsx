import Availability from "@/components/availability";
import Background from "@/components/background";
import { Logo } from "@/components/logo";
import Projects, { ProjectsSkeleton } from "@/components/projects";
import { Separator } from "@yz13/ui/separator";
import Link from "next/link";
import { Suspense } from "react";
import CallToAction from "./components/call-to-action";

export default function Home() {
  return (
    <>
      <Background />
      <main className="flex flex-col h-dvh max-w-md mx-auto *:max-w-sm p-8 gap-[32px] justify-center items-center sm:items-start">
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

        <div className="w-full space-y-4 sm:mt-0 mt-auto">
          <div className="w-full max-w-xs">
            <Availability className="bg-transparent !px-0 !py-0 border-0" size="sm" />
            <div className="w-full">
              <span className="text-muted-foreground text-center text-xs">
                По вопросам и/или предложениям пишите:
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <Link href="mailto:yz13.dev@gmail.com" className="font-medium text-foreground hover:underline">yz13.dev@gmail.com</Link>
                <span className="text-muted-foreground">или</span>
                <Link href="mailto:yztheceo@yandex.ru" className="font-medium text-foreground hover:underline">yztheceo@yandex.ru</Link>
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center flex-col sm:*:w-fit *:w-full sm:flex-row w-full">
            <CallToAction />
          </div>
        </div>
      </main>
    </>
  );
}
