import Background from "@/components/background";
import { Logo } from "@/components/logo";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { ExternalLinkIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="items-center justify-center min-h-screen p-8 flex">
      <Background />
      <main className="flex flex-col max-w-sm gap-[32px] row-start-2 items-center sm:items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Logo size={48} type="icon" />
            <h1 className="text-4xl font-semibold">YZ13</h1>
          </div>

          <p className="block text-muted-foreground">Фронтенд разработчик, специализируюсь на&nbsp;разработке сайтов, веб-приложений.</p>
        </div>

        <div className="space-y-6">
          <section>
            <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left">
              <li className="mb-2 tracking-[-.01em]">
                Фронтенд разработчик
              </li>
              <li className="tracking-[-.01em]">
                React, Next.js, TypeScript, Tailwind CSS
              </li>
            </ol>
          </section>

          <Separator />

          <section className="space-y-3">
            <span className="block font-medium">Проекты</span>
            <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left">
              <li className="mb-2 tracking-[-.01em]">
                <span>
                  YZLAB
                </span>
                <ExternalLinkIcon size={14} className="inline-block ml-2" />
              </li>
              <li className="tracking-[-.01em]">
                <span>
                  Аггрегатор новостей
                </span>
                <ExternalLinkIcon size={14} className="inline-block ml-2" />
              </li>
            </ol>
          </section>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button>
            Запланировать видеозвонок
          </Button>
          <Button
            variant="secondary"
          >
            Чат
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
