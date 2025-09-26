import { Template } from "@/types/schemas/template";
import { initIframe } from "@/utils/iframe-zoom";
import { cn } from "@yz13/ui/utils";
import { useEffect, useState } from "react";


const getTemplates = async () => {
  try {

    const response = await fetch("https://templates.yz13.ru/templates.json")

    const data = await response.json()

    return data;

  } catch (error) {
    console.error(error)
    return []
  }
}

export default function () {

  const [templates, setTemplates] = useState<Template[]>([])

  useEffect(() => {
    getTemplates().then(data => setTemplates(data))
  }, [])
  return templates
    .map(template => {

      const src = (new URL(template.path, "https://templates.yz13.ru")).toString();
      const isHorizontal = template.orientation === "horizontal";
      const zoom = isHorizontal ? .25 : .5;

      return (
        <iframe
          key={template.id}
          id={template.id}
          src={src}
          title={template.name}
          className={cn(
            "rounded-md border outline-none h-96",
            isHorizontal ? "aspect-video" : "aspect-[9/16]"
          )}
          onLoad={() => initIframe(template.id, zoom)}
          loading="lazy"
          sandbox="allow-same-origin"
        />
      )
    })
}
