import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/utils";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";






export function Section({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={cn("space-y-6", className)}>
      {children}
    </section>
  )
}

export function SectionHeader({
  className = "",
  description,
  title,
  link
}: {
  link?: string,
  title?: React.ReactNode,
  description?: React.ReactNode,
  className?: string
}) {
  return (
    <div className={cn(
      "w-full flex items-center justify-between gap-4",
      className
    )}
    >
      <div className="w-full space-y-2 *:block">
        {title && <SectionTitle>{title}</SectionTitle>}
        {description && <SectionDescription>{description}</SectionDescription>}
      </div>
      {link && <SectionAction link={link} />}
    </div>
  )
}

export function SectionTitle({ children }: { children?: React.ReactNode }) {
  return <h3 className="text-4xl font-medium">{children}</h3>
}

export function SectionDescription({ children }: { children?: React.ReactNode }) {
  return <p className="text-base text-muted-foreground">{children}</p>
}

export function SectionAction({ link }: { link: string }) {
  return (
    <Button variant="secondary" asChild>
      <Link to={link}>
        <ArrowRightIcon />
      </Link>
    </Button>
  )
}

export function SectionContent({ children, className = "" }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  )
}
