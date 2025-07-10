"use client"
import { cn } from "@yz13/ui/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import variant1 from "/background/variant-1.gif?url";
import variant10 from "/background/variant-10.gif?url";
import variant11 from "/background/variant-11.gif?url";
import variant12 from "/background/variant-12.gif?url";
import variant13 from "/background/variant-13.gif?url";
import variant14 from "/background/variant-14.gif?url";
import variant15 from "/background/variant-15.gif?url";
import variant16 from "/background/variant-16.gif?url";
import variant17 from "/background/variant-17.gif?url";
import variant18 from "/background/variant-18.gif?url";
import variant19 from "/background/variant-19.gif?url";
import variant2 from "/background/variant-2.gif?url";
import variant20 from "/background/variant-20.gif?url";
import variant21 from "/background/variant-21.gif?url";
import variant3 from "/background/variant-3.gif?url";
import variant4 from "/background/variant-4.gif?url";
import variant5 from "/background/variant-5.gif?url";
import variant6 from "/background/variant-6.gif?url";
import variant7 from "/background/variant-7.gif?url";
import variant8 from "/background/variant-8.gif?url";
import variant9 from "/background/variant-9.gif?url";

const bgs = [
  variant1,
  variant2,
  variant3,
  variant4,
  variant5,
  variant6,
  variant7,
  variant8,
  variant9,
  variant10,
  variant11,
  variant12,
  variant13,
  variant14,
  variant15,
  variant16,
  variant17,
  variant18,
  variant19,
  variant20,
  variant21,
];

const randomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function Background({
  className = "",
}: {
  className?: string;
}) {
  const randomBg = bgs[randomNumberInRange(0, bgs.length - 1)];
  const bgSrc = randomBg ?? variant1;

  const [loaded, setLoaded] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);


  useEffect(() => {
    setReady(true)
  }, [])
  if (!ready) return null
  return (
    <div className={cn("w-full h-dvh absolute top-0 z-[-1] left-0", className)}>
      <div
        className="w-full h-full relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1 }}
          className={cn(
            "w-full h-full relative",
            "grayscale bg-gradient-to-b from-background via-transparent to-background blur-2xl"
          )}
        >
          <img
            onLoad={() => setLoaded(true)}
            className="object-cover opacity-10 w-full h-full invert dark:invert-0"
            src={bgSrc}
            alt="background"
          />
        </motion.div>
      </div>
    </div>
  );
}
