import { cn } from "@yz13/ui/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<"svg">;
export default function ({ className, ...props }: Props) {
  return (
    <svg
      width="100%"
      height="100%"
      className={cn("[&>*]:fill-foreground", className)}
      viewBox="0 0 133 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M61.142 29V14.3624H57.5907V10.7232H54V3H57.9853V10.3188H61.5366V13.9984H64.7721V10.3188H68.3234V3H72.3482V10.7232H68.718V14.3624H65.1667V29H61.142Z" fill="var(--foreground)" />
      <path d="M79.9402 29V25.3608H76.3495V17.5972H79.9402V13.9984H90.6729V7.08398H80.3348V10.7232H76.3495V3H91.0675V6.67963H94.6976V14.3624H91.0675V18.0016H80.3348V24.9565H90.6729V21.2768H94.6976V29H79.9402Z" fill="var(--foreground)" />
      <path d="M105.841 29V7.08398H102.684V10.7232H98.699V6.67963H102.29V3H106.235V6.67963H109.866V29H105.841Z" fill="var(--foreground)" />
      <path d="M118.243 29V25.3608H114.652V21.2768H118.637V24.9565H128.975V18.0016H118.243V13.9984H128.975V7.08398H118.637V10.7232H114.652V6.67963H118.243V3H129.37V6.67963H133V14.3624H129.37V17.5972H133V25.3608H129.37V29H118.243Z" fill="var(--foreground)" />
      <path d="M37 21V28H11V21H15V14H19V9H22V4H26V9H29V14H33V21H37Z" fill="var(--foreground)" />
      <path d="M42 28V32H38V28H41V20H44V12H41V4H38V0H42V4H45V12H48V20H45V28H42Z" fill="var(--foreground)" />
      <path d="M10 28V32H6V28H3V20H0V12H3V4H6V0H10V4H7V12H4V20H7V28H10Z" fill="var(--foreground)" />
    </svg>
  )
}
