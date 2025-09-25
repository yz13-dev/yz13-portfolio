import { Template } from "@/types/schemas/template";
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

      return (
        <iframe
          className="w-full aspect-video outline-none"
          title={template.name}
          key={template.id}
          src={src}
        />
      )
    })
}
