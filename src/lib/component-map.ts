import type React from "react";
import { Countdown } from "@/components/modules/Countdown";
import { FloatingHearts } from "@/components/modules/FloatingHearts";
import { NeonText } from "@/components/modules/NeonText";
import { StandardText } from "@/components/modules/StandardText";

type ModuleComponent = (props: Record<string, unknown>) => React.ReactNode;

export const componentMap: Record<string, ModuleComponent> = {
  neon_text: NeonText as ModuleComponent,
  standard_text: StandardText as ModuleComponent,
  floating_hearts: FloatingHearts as ModuleComponent,
  countdown: Countdown as ModuleComponent,
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
    transition: { duration: 0.6 },
  },
  scale_in: {
    initial: { opacity: 0, transform: "scale(0.95)" },
    animate: { opacity: 1, transform: "scale(1)" },
    transition: { duration: 0.5 },
  },
  typewriter: {
    initial: { opacity: 0, transform: "translateY(10px)" },
    animate: { opacity: 1, transform: "translateY(0)" },
    transition: { duration: 0.8 },
  },
};
