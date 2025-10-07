import { cn } from "@yz13/ui/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"svg">;
export default function ({ className, ...props }: Props) {
  return (
    <svg
      width="100%"
      height="100%"
      className={cn("[&>*]:fill-foreground", className)}
      viewBox="0 0 239 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8 4H4V46H8V50H4V46H0V4H4V0.00012207L8 0V4Z" fill="var(--foreground)" />
      <path d="M16 4.00024H20V8.00024H24V12.0002H28V8.00024H24V4.00024H20V0.000244141H16V4.00024Z" fill="var(--foreground)" />
      <path d="M56 0.000190303V4.00012H52V8.00012H48V12.0001H52V8.00012H56V4.00012L60 4.00014V0.00012207L56 0.000190303Z" fill="var(--foreground)" />
      <path d="M36 4.00024V8.00024H33V16.0002H20V20.0002H24V23.0002H28V31.0002H24V27.0002H20V31.0002H16V35.0002H12V39.0002H16V35.0002H20V31.0002H24V39.0002H28V35.0002H32V31.0002H36V27.0002H40V31.0002H44V35.0002H48V39.0002H52V31.0001H56V35.0001L60 35.0002V39.0002H64V35.0002H60V31.0001H56V27.0001H52V31.0001H48V23.0102L52 23.0001V20.0002H56V16.0002H43V8.00024H40C40 6.17704 39.9231 4.00024 39.9231 4.00024H36Z" fill="var(--foreground)" />
      <path d="M36 34.9999V49.9999H40V34.9999H36Z" fill="var(--foreground)" />
      <path d="M68 4H72V46H68V50H72V46H76V4H72V0.00012207L68 0V4Z" fill="var(--foreground)" />
      <path d="M92 29H100V37H117V54H100V62H117V54H125V4H117V29H100V4H92V29Z" fill="var(--foreground)" />
      <path d="M144 21V29H135V46H169V37H144V29H160V21H144Z" fill="var(--foreground)" />
      <path d="M160 21L169 21V4L135 4V13L160 13V21Z" fill="var(--foreground)" />
      <path d="M188 12H179L179 20H188V45H196V4H188V12Z" fill="var(--foreground)" />
      <path d="M206 4V12H231V20H214V29H231V37H206V45H231V37H239V29H231V20H239V12H231V4H206Z" fill="var(--foreground)" />
    </svg>
  )
}
