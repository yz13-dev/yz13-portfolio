import { GetStoreV1200Item } from "@yz13/api/types";
import { Skeleton } from "@yz13/ui/skeleton";
import { ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router";

type Project = GetStoreV1200Item;

export const RecentProjectsSkeleton = () => {
  const arr = Array.from({ length: 3 }).map((_, i) => i)
  return (
    <>
      {
        arr.map(index => <Skeleton key={index} className="h-14 w-40" />)
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
      return (
        <button
          key={pub.id}
          type="button"
          className="w-fit h-14 group rounded-md bg-card flex items-center justify-center px-4 relative ring-2 ring-border/20 hover:ring-border transition-all"
        >
          {
            publicUrl &&
            <Link
              to={publicUrl}
              target="_blank"
              className="absolute inset-0"
            />
          }
          <span className="text-4xl font-bold text-muted-foreground group-hover:text-foreground transition-colors">{pub.name}</span>
          {
            stage &&
            <div className="absolute -right-6 -top-1.5 rotate-12 flex items-center justify-center py-1 px-2 capitalize rounded-full bg-secondary border">
              <span className="text-xs text-muted-foreground">{stage}</span>
            </div>
          }
          {
            publicUrl &&
            <div className="absolute -right-1.5 -top-1.5 flex items-center justify-center p-1 rounded-full bg-secondary border text-muted-foreground group-hover:text-foreground transition-colors">
              <ExternalLinkIcon size={12} />
            </div>
          }
        </button>
      )
    })
}
