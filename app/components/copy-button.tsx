import { Button } from "@yz13/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { type ComponentProps, useState } from "react";

type Props = ComponentProps<"button"> & {
  value: string
}

export default function ({ className, value, ...props }: Props) {

  const [copied, setCopied] = useState<boolean>(false)

  const copy = () => {
    try {
      navigator.clipboard.writeText(value);
      setCopied(true)
    } catch (error) {
      console.warn(error)
    } finally {
      setTimeout(() => setCopied(false), 1000)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={copy}
      {...props}
    >
      {
        copied
          ? <CheckIcon />
          : <CopyIcon />
      }
    </Button>
  )
}
