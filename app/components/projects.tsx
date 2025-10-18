import useProjects from "@/hooks/use-projects";
import { cdn } from "@/utils/cdn";
import { Badge } from "@yz13/ui/badge";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router";

export default function () {
  const [projects, loading] = useProjects();
  return projects
    .map(project => {

      const icon = project.icon as { type: string, dark: string, light: string };

      const created_at = new Date(project.created_at);
      const public_url = project.public_url;

      return <li key={project.id} className="w-full group flex items-center justify-between gap-2 py-2 relative">
        {
          public_url &&
          <Link to={public_url} className="absolute inset-0" />
        }
        <div className="flex items-center gap-2">
          <div className="size-5 rounded-full bg-card border overflow-hidden">
            <img src={cdn(`/apps${icon.light}`)} className="size-full light-mode-image" alt="light-mode-image" />
            <img src={cdn(`/apps${icon.dark}`)} className="size-full dark-mode-image" alt="dark-mode-image" />
          </div>
          <span className="text-base font-medium group-hover:underline">{project.name}</span>
          <ExternalLink className="size-3" />
        </div>
        <span className="dashed-line" />
        <Badge variant="outline">{format(created_at, "dd MMMM", { locale: ru })}</Badge>
      </li>
    })
}
