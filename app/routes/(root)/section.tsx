import { cn } from "@yz13/ui/utils"


type SectionCommonProps = {
  children?: React.ReactNode
  className?: string
}

export const Section = ({ children, className = "" }: SectionCommonProps) => {
  return (
    <section className={className}>
      {children}
    </section>
  )
}

export const SectionTitle = ({ children, className = "" }: SectionCommonProps) => {

  return <h2 className={cn("lg:text-4xl text-2xl font-semibold", className)}>{children}</h2>
}

export const SectionContent = ({ children, className = "" }: SectionCommonProps) => {
  return <div className={className}>{children}</div>
}
