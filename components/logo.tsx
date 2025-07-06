import yz_dark from "@/public/logo/dark.png";
import yz_full_dark from "@/public/logo/full-dark.png";
import yz_full_light from "@/public/logo/full-light.png";
import yz_light from "@/public/logo/light.png";
import { cn } from "@yz13/ui/utils";
import Image from "next/image";


const Logo = ({
  label,
  className = "",
  type = "icon",
  imgClassName,
  size: provided,
}: {
  label?: string;
  className?: string;
  imgClassName?: string;
  type?: "icon" | "full";
  size?: number;
}) => {
  const lightSrc = type === "icon" ? yz_light : yz_full_light;
  const darkSrc = type === "icon" ? yz_dark : yz_full_dark;
  const isSizeToSmall = provided && provided < 40;
  const defaultSize = 36;
  const size = provided ?? defaultSize;
  const width = type === "icon" ? size : size * 4.15625;
  const height = size;
  const Label = () => (
    <span className="text-xs text-foreground absolute -top-2 left-[105%]">
      {label}
    </span>
  );
  if (size) {
    return (
      <div className={cn("relative", className)}>
        <Image
          className={cn(imgClassName, "light-mode-image")}
          width={width}
          height={height}
          placeholder={isSizeToSmall ? undefined : "blur"}
          src={lightSrc}
          alt="YZ13"
        />
        <Image
          className={cn(imgClassName, "dark-mode-image")}
          width={width}
          height={height}
          placeholder={isSizeToSmall ? undefined : "blur"}
          src={darkSrc}
          alt="YZ13"
        />
        {label && <Label />}
      </div>
    );
  }
  return (
    <div className={cn("relative", className)}>
      <Image
        fill
        className={cn(imgClassName, "light-mode-image")}
        src={lightSrc}
        alt="YZ13-LOGO"
      />
      <Image
        fill
        className={cn(imgClassName, "dark-mode-image")}
        src={darkSrc}
        alt="YZ13-LOGO"
      />
      {label && <Label />}
    </div>
  );
};
export { Logo };
