import { cdn } from "@/utils/cdn";
import { GetStoreV1200Item } from "@yz13/api/types";
import { cn } from "@yz13/ui/utils";

export type Project = GetStoreV1200Item;

export const ProjectLogo = ({ project, className = "" }: { project: Project, className?: string }) => {

  const icon = project.icon as any;

  return (
    <>
      {icon.type === "themed" && (
        <>
          <img
            src={cdn(`/apps${icon.dark}`)}
            className={cn("dark-mode-image", className)}
            alt=""
          />
          <img
            src={cdn(`/apps${icon.light}`)}
            className={cn("light-mode-image", className)}
            alt=""
          />
        </>
      )}
      {icon.type === "simple" && (
        <img
          src={cdn(`/apps${icon.url}`)}
          className={className}
          alt=""
        />
      )}
    </>
  );
}
