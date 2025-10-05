import { cn } from "@yz13/ui/utils";
import yz_dark from "/logo/dark.png?url";
import yz_full_dark from "/logo/full-dark.png?url";
import yz_full_light from "/logo/full-light.png?url";
import yz_light from "/logo/light.png?url";


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
  // const isSizeToSmall = provided && provided < 40;
  const defaultSize = 36;
  const size = provided ?? defaultSize;
  const width = type === "icon" ? size : size * 4.15625;
  const height = size;
  if (size) {
    return (
      <div className={cn("relative", className)}>
        <img
          className={cn(imgClassName, "light-mode-image")}
          width={width}
          height={height}
          // placeholder={isSizeToSmall ? undefined : "blur"}
          src={lightSrc}
          alt="YZ13"
        />
        <img
          className={cn(imgClassName, "dark-mode-image")}
          width={width}
          height={height}
          // placeholder={isSizeToSmall ? undefined : "blur"}
          src={darkSrc}
          alt="YZ13"
        />
      </div>
    );
  }
  return (
    <div className={cn("relative", className)}>
      <img
        className={cn(imgClassName, "light-mode-image")}
        src={lightSrc}
        alt="YZ13-LOGO"
      />
      <img
        className={cn(imgClassName, "dark-mode-image")}
        src={darkSrc}
        alt="YZ13-LOGO"
      />
    </div>
  );
};
export { Logo };
