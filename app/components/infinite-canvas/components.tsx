import { cdn } from "@/utils/cdn"
import { Button } from "@yz13/ui/button"
import { cn } from "@yz13/ui/utils"
import { ArrowUpRightIcon } from "lucide-react"
import React, { useCallback } from "react"
import { Link } from "react-router"
import { ExtenderPublication } from "../../routes/page"
import Availability from "../availability"
import Background from "../background"
import CallToAction from "../call-to-action"
import { Logo } from "../logo"
import { Group, GroupItem } from "./group"

// Utility functions
export const chunkArray = <T extends any>(arr: T[], size: number): T[][] => {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

// Memoized components
export const MainContent = React.memo(({ isRoot }: { isRoot: boolean }) => {
  const MainWrapper = useCallback(({ root, children, className = "" }: { root: boolean, children?: React.ReactNode, className?: string }) => {
    if (root) return <main className={className}>{children}</main>
    return <div className={className}>{children}</div>
  }, [])

  return (
    <MainWrapper root={isRoot} className="w-full h-full max-w-sm gap-6 bg-card backdrop-blur-md rounded-4xl flex flex-col justify-between border p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-center relative gap-2 aspect-video w-full bg-secondary/20 border rounded-lg overflow-hidden">
          <Logo size={56} type="icon" />
          <span className="text-5xl font-pixel font-medium">YZ13</span>
          <Background className="h-full" videoClassName="blur-lg" />
        </div>

        <div>
          <h1 className="md:text-4xl text-3xl font-semibold">YZ13 - Фронтенд разработчик</h1>
        </div>

        <div>
          <p className="md:text-base text-sm text-muted-foreground">
            Превращаю дизайн в работающий код. Разрабатываю сайты и веб-приложения с упором на удобство и скорость.
          </p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div>
          <div className="w-full max-w-xs space-y-2">
            <Availability className="bg-transparent !px-0 !py-0 border-0" size="sm" enabled={false} />
            <div className="w-full">
              <span className="text-muted-foreground block text-xs">
                По вопросам и/или предложениям пишите:
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <Link to="mailto:yz13.dev@gmail.com" className="font-medium text-foreground hover:underline">yz13.dev@gmail.com</Link>
                <span className="text-muted-foreground">или</span>
                <Link to="mailto:yztheceo@yandex.ru" className="font-medium text-foreground hover:underline">yztheceo@yandex.ru</Link>
              </div>
            </div>
          </div>
        </div>

        <div className={cn(
          "flex gap-4 items-center flex-col",
          "*:w-full *:h-12 *:text-base [&>svg]:!size-[18]"
        )}>
          <CallToAction enabled={false} />
        </div>
      </div>
    </MainWrapper>
  )
})

export const LogoSection = React.memo(() => (
  <div className="h-full flex flex-col gap-4">
    <GroupItem label="OG">
      <img src="/og/og.png" className="w-full h-full object-cover" alt="og" />
    </GroupItem>
    <GroupItem label="Logo">
      <div className="w-[600px] h-[270px] grid grid-cols-2 grid-rows-2">
        <div className="p-4 w-full h-full rounded-md bg-white flex items-center justify-center">
          <img src="/logo/light.png" className="h-1/2" alt="yz13" />
        </div>
        <div className="p-4 w-full h-full rounded-md bg-black flex items-center justify-center">
          <img src="/logo/dark.png" className="h-1/2" alt="yz13" />
        </div>
        <div className="p-4 w-full h-full rounded-md bg-black flex items-center justify-center">
          <img src="/logo/full-dark.png" className="h-1/2" alt="yz13" />
        </div>
        <div className="p-4 w-full h-full rounded-md bg-white flex items-center justify-center">
          <img src="/logo/full-light.png" className="h-1/2" alt="yz13" />
        </div>
      </div>
    </GroupItem>
  </div>
))

export const ScreenshotsSection = React.memo(() => (
  <Group
    label="YZ13 Portfolio"
    groupClassName="w-full"
    className="*:w-full"
  >
    <GroupItem label="v1 Dark" className="w-full">
      <img src="/screenshots/yz13-v1-dark.png" className="object-cover" alt="yz13-dark" />
    </GroupItem>
    <GroupItem label="v1 Light" className="w-full">
      <img src="/screenshots/yz13-v1-light.png" className="object-cover" alt="yz13-light" />
    </GroupItem>
  </Group>
))

export const ProjectGroup = React.memo(({ project }: { project: ExtenderPublication }) => {
  const title = project.name
  const description = project.description
  const attachments = project.attachments ?? []
  const publicUrl = project.public_url

  return (
    <Group
      key={project.id}
      label={title}
      description={description ?? undefined}
      groupClassName="w-1/2"
      className="*:w-full"
      actions={
        <>
          {
            publicUrl &&
            <Button variant="secondary" size="icon" className="size-7" asChild>
              <Link to={publicUrl}>
                <ArrowUpRightIcon size={16} />
              </Link>
            </Button>
          }
        </>
      }
    >
      {
        attachments.length > 0 &&
        attachments
          .map((attachement, index) => {
            const url = attachement.url.startsWith("/") ? cdn(attachement.url) : attachement.url;
            const label = `Приклепление #${index + 1}`

            return (
              <GroupItem key={attachement.url} label={label} className="w-full">
                <img src={url} className="object-cover" alt="yz13-dark" />
              </GroupItem>
            )
          })
      }
    </Group>
  )
})

export const ProjectChunk = React.memo(({ items }: { items: ExtenderPublication[] }) => (
  <div className="w-full flex flex-row gap-4">
    {
      items.map(project => (
        <ProjectGroup key={project.id} project={project} />
      ))
    }
  </div>
)) 