import useBlog from "@/hooks/use-blog";
import { Badge } from "@yz13/ui/badge";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Link } from "react-router";


export default function () {
  const [blog, loading] = useBlog();
  return blog
    .map(post => {

      const created_at = new Date(post.date);
      const public_url = `https://blog.yz13.ru/${post.id}`;

      return <li key={post.id} className="w-full group flex items-center justify-between gap-2 py-2 relative">
        {
          public_url &&
          <Link to={public_url} className="absolute inset-0" />
        }
        <span className="text-base font-medium group-hover:underline">{post.title}</span>
        <span className="dashed-line" />
        <Badge variant="outline">{format(created_at, "dd MMMM", { locale: ru })}</Badge>
      </li>
    })
}
