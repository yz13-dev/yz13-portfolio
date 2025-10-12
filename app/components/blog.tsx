import useBlog from "@/hooks/use-blog";
import { Badge } from "@yz13/ui/badge";
import { Skeleton } from "@yz13/ui/skeleton";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router";
import { Section, SectionContent, SectionHeader } from "./section";


export default function () {
  const [blog, loading] = useBlog();
  return (
    <Section>
      <SectionHeader
        title="Блог"
        description="Время от времени добавляю что-то новое в блог."
      />
      <SectionContent className="*:py-3 *:px-4 border bg-card rounded-3xl divide-y [&>li]:rounded-none overflow-hidden">
        {
          loading
            ?
            <>
              <Skeleton className="w-full h-16 rounded-none" />
              <Skeleton className="w-full h-16 rounded-none" />
              <Skeleton className="w-full h-16 rounded-none" />
            </>
            :
            blog
              .map(post => {

                // @ts-ignore
                const created_at = new Date(post.updated_at);

                return (
                  <div key={post.id} className="w-full flex items-center justify-between gap-4 relative ">
                    <div className="flex items-center gap-2">
                      <div className="w-full flex flex-col gap-1">
                        <Link to={`https://blog.yz13.ru/${post.id}`} className="font-medium text-2xl inline-flex items-center gap-2">
                          {post.title}
                          <ExternalLinkIcon className="size-5" />
                        </Link>
                        <span className="text-muted-foreground">{post.summary}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-base"
                    >
                      {format(created_at, "dd MMMM", { locale: ru })}
                    </Badge>
                  </div>
                )
              })
        }
      </SectionContent>
    </Section>
  )
}
