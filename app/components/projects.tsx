import usePublications from "@/hooks/use-publications";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { Skeleton } from "@yz13/ui/skeleton";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router";
import { ProjectLogo } from "./project-logo";
import { Section, SectionContent, SectionHeader } from "./section";




export default function () {
  const [publications, loading] = usePublications();
  return (
    <Section>
      <SectionHeader
        title="Проекты"
        description="Проекты над которыми я работаю."
        link="/apps"
      />
      <SectionContent>
        <ul className="*:py-3 *:px-4 border rounded-3xl bg-card divide-y [&>li]:rounded-none overflow-hidden">
          {
            loading
              ?
              <>
                <Skeleton className="w-full h-20 rounded-none" />
                <Skeleton className="w-full h-20 rounded-none" />
                <Skeleton className="w-full h-20 rounded-none" />
              </>
              :
              publications
                .sort((a, b) => {
                  const aHavePublicUrl = a.public_url !== null;
                  const bHavePublicUrl = b.public_url !== null;
                  if (aHavePublicUrl && !bHavePublicUrl) return -1;
                  if (!aHavePublicUrl && bHavePublicUrl) return 1;
                  return 0;
                })
                .map((publication, index) => <li key={publication.id}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-[8px] bg-background border relative overflow-hidden">
                          <ProjectLogo project={publication} />
                        </div>
                        <span className="text-2xl font-medium">{publication.name}</span>
                        {publication.public_url && <ExternalLinkIcon size={18} />}
                        {
                          publication.stage &&
                          <Badge variant="secondary" className="capitalize">{publication.stage}</Badge>
                        }
                      </div>
                      {
                        publication.description &&
                        <span className="text-base text-muted-foreground">{publication.description}</span>
                      }
                    </div>
                    {
                      publication.public_url &&
                      <Button variant="secondary" size="sm" asChild>
                        <Link to={publication.public_url} target="_blank">
                          <span>Открыть</span><ArrowRightIcon />
                        </Link>
                      </Button>
                    }
                  </div>
                </li>
                )
          }
        </ul>
      </SectionContent>
    </Section>
  )
}
