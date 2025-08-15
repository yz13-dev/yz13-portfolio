import { Separator } from "@yz13/ui/separator"
import { Skeleton } from "@yz13/ui/skeleton"
import { cn } from "@yz13/ui/utils"
import { ComponentProps, Fragment } from "react"
import { Project } from "./page"
import { SectionContent } from "./section"

type Props = {
  projects?: Project[]
}

export const RecentProjectsError = () => {
  return (
    <SectionContent className="w-full flex flex-col gap-3">
      <article
        className="w-full 2xl:*:w-1/2 *:w-full flex 2xl:flex-row flex-col gap-3 py-6"
      >
        <div>
          <h3 className="lg:text-4xl text-2xl font-medium text-foreground">Ошибка при загрузке</h3>
          <p className="lg:text-2xl text-base font-medium text-muted-foreground">Проверьте соединение и попробуйте еще раз</p>
        </div>
      </article>
    </SectionContent>
  )
}

export const RecentProjectsSkeleton = () => {
  const articles = Array.from({ length: 2 }).map((_, index) => index)
  return (
    <SectionContent>
      {
        articles
          .map((item) => {
            return (
              <Fragment key={`recent-projects/skeleton/${item}`}>
                <Separator className="w-full" />
                <article
                  className="w-full 2xl:*:w-1/2 *:w-full flex 2xl:flex-row flex-col gap-3 p-6 min-h-[350px] max-w-[1600px] mx-auto"
                >
                  <div className="space-y-2">
                    <Skeleton className="w-1/2 h-10" />
                    <Skeleton className="w-1/3 h-8" />
                  </div>
                  <div>
                    <Skeleton className="w-full aspect-[4/2.7]" />
                  </div>
                </article>
              </Fragment>
            )
          })
      }
    </SectionContent>
  )
}

export default function ({ projects = [] }: Props) {

  const onlyWithAttachments = projects.filter(project => !!project.attachments.length)

  return null;
  // return (
  //   <SectionContent className="w-full">
  //     {
  //       projects
  //         .filter(project => !!project.attachments.length)
  //         .map(project => {
  //           const attachments = project.attachments;
  //           return (
  //             <Fragment key={project.id}>
  //               <Separator className="w-full" />
  //               <article
  //                 className="w-full 2xl:*:w-1/2 *:w-full flex 2xl:flex-row flex-col gap-3 p-6 min-h-[350px] max-w-[1600px] mx-auto"
  //               >
  //                 <div className="flex flex-col gap-6 justify-between">
  //                   <div className="w-full *:block space-y-2">
  //                     <h3 className="lg:text-4xl text-2xl font-semibold text-foreground">{project.name}</h3>
  //                     <p className="lg:text-2xl text-base font-medium text-muted-foreground">{project.description}</p>
  //                   </div>
  //                   {
  //                     project.public_url &&
  //                     <Button className="w-fit" size="lg" asChild>
  //                       <Link to={project.public_url}>
  //                         <span>Перейти</span><ArrowRightIcon />
  //                       </Link>
  //                     </Button>
  //                   }
  //                 </div>
  //                 <div>
  //                   <Carousel className="w-full shrink">
  //                     <CarouselContent>
  //                       {
  //                         attachments.map(attachment => {
  //                           return (
  //                             <CarouselItem key={attachment.url} className="aspect-[4/2.7]">
  //                               <Image
  //                                 src={attachment.url}
  //                                 alt={project.name}
  //                                 className="w-full h-full rounded-xl"
  //                               />
  //                             </CarouselItem>
  //                           )
  //                         })
  //                       }
  //                     </CarouselContent>
  //                     <CarouselPrevious className="left-3" />
  //                     <CarouselNext className="right-3" />
  //                   </Carousel>
  //                 </div>
  //               </article>
  //             </Fragment>
  //           )
  //         })
  //     }
  //   </SectionContent>
  // )
}


type ImageProps = ComponentProps<"img">
const Image = ({ className = "", src, alt, ...props }: ImageProps) => {

  return (
    <object className="relative">
      <img
        src={src}
        className={cn("", className)}
        alt={alt}
        {...props}
      />
    </object>
  )
}
