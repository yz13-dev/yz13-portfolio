"use client"
import { cn } from "@yz13/ui/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import variant1 from "/background/bg-1.mp4?url";
import variant10 from "/background/bg-10.mp4?url";
import variant11 from "/background/bg-11.mp4?url";
import variant12 from "/background/bg-12.mp4?url";
import variant13 from "/background/bg-13.mp4?url";
import variant14 from "/background/bg-14.mp4?url";
import variant15 from "/background/bg-15.mp4?url";
import variant16 from "/background/bg-16.mp4?url";
import variant17 from "/background/bg-17.mp4?url";
import variant18 from "/background/bg-18.mp4?url";
import variant19 from "/background/bg-19.mp4?url";
import variant2 from "/background/bg-2.mp4?url";
import variant20 from "/background/bg-20.mp4?url";
import variant21 from "/background/bg-21.mp4?url";
import variant22 from "/background/bg-22.mp4?url";
import variant23 from "/background/bg-23.mp4?url";
import variant24 from "/background/bg-24.mp4?url";
import variant25 from "/background/bg-25.mp4?url";
import variant3 from "/background/bg-3.mp4?url";
import variant4 from "/background/bg-4.mp4?url";
import variant5 from "/background/bg-5.mp4?url";
import variant6 from "/background/bg-6.mp4?url";
import variant7 from "/background/bg-7.mp4?url";
import variant8 from "/background/bg-8.mp4?url";
import variant9 from "/background/bg-9.mp4?url";

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
  variant22,
  variant23,
  variant24,
  variant25,
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
          <video
            muted
            autoPlay
            loop
            playsInline
            onCanPlay={() => setLoaded(true)}
            className="object-cover opacity-10 w-full h-full invert dark:invert-0"
            src={bgSrc}
          />
        </motion.div>
      </div>
    </div>
  );
}
