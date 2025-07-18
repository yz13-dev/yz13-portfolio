import { useEffect, useState } from "react";



export default function () {
  const [isMac, setIsMac] = useState(false)


  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const platform =
      (navigator as any).userAgentData?.platform || navigator.platform || "";

    // Проверка на macOS или iOS (iPadOS тоже попадает сюда)
    const isApple = /Mac|iPhone|iPad|iPod/.test(platform);
    setIsMac(isApple);
  }, []);
  return isMac
}
