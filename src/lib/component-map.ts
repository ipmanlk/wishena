import type React from "react";
import { Countdown } from "@/components/modules/Countdown";
import { FloatingHearts } from "@/components/modules/FloatingHearts";
import { NeonText } from "@/components/modules/NeonText";
import { StandardText } from "@/components/modules/StandardText";

export const componentMap: Record<string, React.FC<Record<string, unknown>>> = {
  neon_text: NeonText,
  standard_text: StandardText,
  floating_hearts: FloatingHearts,
  countdown: Countdown,
};

type AnimationVariant = {
  initial: { opacity: number; transform?: string };
  animate: { opacity: number; transform?: string };
  transition: { duration: number };
};

export const animationVariants: Record<string, AnimationVariant> = {
  fade_up: {
    initial: { opacity: 0, transform: "translateY(20px)" },
    animate: { opacity: 1, transform: "translateY(0)" },
    transition: { duration: 600 },
  },
  scale_in: {
    initial: { opacity: 0, transform: "scale(0.95)" },
    animate: { opacity: 1, transform: "scale(1)" },
    transition: { duration: 500 },
  },
  typewriter: {
    initial: { opacity: 0, transform: "translateY(10px)" },
    animate: { opacity: 1, transform: "translateY(0)" },
    transition: { duration: 800 },
  },
};
