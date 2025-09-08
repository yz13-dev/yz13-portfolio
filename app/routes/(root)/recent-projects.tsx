import { GetStoreV1200Item } from "@yz13/api/types";
import { Badge } from "@yz13/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@yz13/ui/carousel";
import { Skeleton } from "@yz13/ui/skeleton";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ExternalLinkIcon, ImageMinusIcon } from "lucide-react";
import { Link } from "react-router";

type Project = GetStoreV1200Item;

export const RecentProjectsSkeleton = () => {
  const arr = Array.from({ length: 3 }).map((_, i) => i)
  return (
    <>
      {
        arr.map(index => <Skeleton key={index} className="h-[310px] w-[395px]" />)
      }
    </>
  )
}

export default function ({ projects = [] }: { projects?: Project[] }) {
  return projects
    .sort((a, b) => {
      const hasPublicUrlA = a.public_url !== null;
      const hasPublicUrlB = b.public_url !== null;
      if (hasPublicUrlA === hasPublicUrlB) return 0;
      if (hasPublicUrlA) return -1;
      return 1;
    })
    .map(pub => {
      const publicUrl = pub.public_url;
      const stage = pub.stage;

      const createdAt = new Date(pub.created_at);
      const notCurrentYear = new Date().getFullYear() !== createdAt.getFullYear();

      const attachments = pub.attachments ?? [];
      const hasAttachments = attachments.length > 0;
      const moreThatOneAttachment = attachments.length > 1;

      return (
        <div
          key={pub.id}
          className="w-full h-fit group rounded-4xl hover:bg-card p-3 relative ring-2 ring-border/20 hover:ring-border transition-all"
        >
          {
            publicUrl &&
            <Link
              to={publicUrl}
              target="_blank"
              className="absolute inset-0 cursor-pointer"
            />
          }
          <div className="w-full aspect-[4/2.6] rounded-xl border flex items-center justify-center">
            {
              hasAttachments
                ?
                <Carousel className="relative">
                  <CarouselContent>
                    {
                      attachments
                        .map(attachment => {
                          return (
                            <CarouselItem key={attachment.url} className="rounded-xl">
                              <img
                                src={attachment.url}
                                className="rounded-xl"
                                alt={pub.name}
                              />
                            </CarouselItem>
                          )
                        })
                    }
                  </CarouselContent>
                  {
                    moreThatOneAttachment &&
                    <>
                      <CarouselNext className="right-2" />
                      <CarouselPrevious className="left-2" />
                    </>
                  }
                </Carousel>
                :
                <ImageMinusIcon />
            }
          </div>
          <div className="space-y-2 w-full p-3">
            <div className="w-full space-y-0 *:text-start">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">{pub.name}</span>
                {
                  publicUrl && <ExternalLinkIcon size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                }
                {
                  stage &&
                  <Badge variant="secondary" className="capitalize">{stage}</Badge>
                }
              </div>
              <span className="text-sm text-muted-foreground">{pub.description ?? "Без описания"}</span>
            </div>
            <Badge variant="secondary" className="capitalize">
              {
                format(createdAt, notCurrentYear ? "d MMMM yyyy" : "d MMMM", { locale: ru })
              }
            </Badge>
          </div>
        </div>
      )
    })
}
