import { Skeleton } from "@yz13/ui/skeleton"
import { Project } from "./page"


type Props = {
  projects?: Project[]
}

export const RecentProjectsError = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Skeleton className="xl:h-[500px] h-[400px] w-full" />
      <div className="h-6 flex items-center" />
      <span>Ошибка при загрузке</span>
    </div>
  )
}

export const RecentProjectsSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Skeleton className="xl:h-[500px] h-[400px] w-full" />
      <Skeleton className="w-1/3 h-6" />
    </div>
  )
}

export default function ({ projects = [] }: Props) {
  const attachments = projects
    .filter(pub => !!pub.attachments.length)
    .map(pub => ({
      id: pub.id,
      title: pub.name,
      description: pub.description,
      attachments: pub.attachments
    }))
  return (
    <div className="w-full h-fit overflow-x-hidden infinite-scroll-container">
      <div
        style={{
          '--duration': '60s'
        } as React.CSSProperties}
        className="flex items-center gap-4 w-max infinite-scroll-track"
      >
        {
          [...attachments, ...attachments]
            .map((attachment, index) => {
              const title = attachment.title
              const description = attachment.description
              const attachments = attachment.attachments
              return (
                <div key={`${attachment.id}/${index}`} className="flex shrink-0 flex-col gap-3 h-full">
                  <div className="flex items-center h-full gap-3">
                    {
                      attachments
                        .map(item => {
                          return (
                            <img
                              className="block relative w-full xl:h-[500px] h-[400px] rounded-2xl border"
                              key={`${attachment.id}/${item.url}/${index}`}
                              src={item.url}
                              alt={attachment.title}
                            />
                          )
                        })
                    }
                  </div>
                  <div className="flex items-center gap-2 *:text-base">
                    <span className="text-foreground line-clamp-1">
                      {title} - {description}
                    </span>
                  </div>
                </div>
              )
            })
        }
      </div>
    </div>
  )
}
