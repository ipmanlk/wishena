"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";
import type { VisualsPreset } from "@/lib/types";

interface ParticleBackgroundProps {
  preset: VisualsPreset;
  mobileDensity: number;
  desktopDensity: number;
}

interface ParticlePreset {
  particles: {
    color?: { value: string | string[] };
    move?: {
      enable: boolean;
      speed: number;
      direction: string;
      outModes?: string;
    };
    opacity?: { value: number | { min: number; max: number } };
    size?: { value: { min: number; max: number } };
    blur?: { enable: boolean; value: number };
    shape?: { type: "circle" };
  };
}

const presets: Record<VisualsPreset, ParticlePreset> = {
  "glow-dust": {
    particles: {
      color: { value: ["#ec4899", "#06b6d4", "#8b5cf6"] },
      move: { enable: true, speed: 0.5, direction: "none" as const },
      opacity: { value: { min: 0.3, max: 0.8 } },
      size: { value: { min: 1, max: 3 } },
      blur: { enable: true, value: 5 },
    },
  },
  confetti: {
    particles: {
      color: { value: ["#f59e0b", "#ec4899", "#10b981", "#3b82f6"] },
      move: { enable: true, speed: 2, direction: "bottom" as const },
      opacity: { value: 1 },
      size: { value: { min: 4, max: 8 } },
      shape: { type: "circle" as const },
    },
  },
  snow: {
    particles: {
      color: { value: "#ffffff" },
      move: { enable: true, speed: 1, direction: "bottom" as const },
      opacity: { value: { min: 0.5, max: 1 } },
      size: { value: { min: 1, max: 3 } },
    },
  },
  petals: {
    particles: {
      color: { value: ["#fbcfe8", "#ffffff", "#fce7f3"] },
      move: {
        enable: true,
        speed: 1.5,
        direction: "bottom" as const,
        outModes: "out",
      },
      opacity: { value: { min: 0.6, max: 0.9 } },
      size: { value: { min: 3, max: 6 } },
      shape: { type: "circle" as const },
    },
  },
  "gold-dust": {
    particles: {
      color: { value: "#fbbf24" },
      move: { enable: true, speed: 0.3, direction: "none" as const },
      opacity: { value: { min: 0.1, max: 0.5 } },
      size: { value: { min: 1, max: 2 } },
      blur: { enable: true, value: 3 },
    },
  },
  linen: {
    particles: {
      color: { value: "#a8a29e" },
      move: { enable: false, speed: 0, direction: "none" as const },
      opacity: { value: { min: 0.05, max: 0.15 } },
      size: { value: { min: 0.5, max: 1.5 } },
    },
  },
  balloons: {
    particles: {
      color: { value: ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"] },
      move: {
        enable: true,
        speed: 2,
        direction: "top" as const,
        outModes: "out",
      },
      opacity: { value: { min: 0.6, max: 0.9 } },
      size: { value: { min: 10, max: 25 } },
      shape: { type: "circle" as const },
    },
  },
  spotlight: {
    particles: {
      color: { value: "#ffffff" },
      move: { enable: true, speed: 0.5, direction: "none" as const },
      opacity: { value: { min: 0.05, max: 0.2 } },
      size: { value: { min: 50, max: 150 } },
      blur: { enable: true, value: 50 },
    },
  },
};

export function ParticleBackground({
  preset,
  mobileDensity,
  desktopDensity,
}: ParticleBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInitialized(true));
  }, []);

  const options = useMemo(
    () =>
      ({
        ...presets[preset],
        particles: {
          ...presets[preset].particles,
          number: {
            value: isMobile ? mobileDensity : desktopDensity,
          },
        },
      }) as object,
    [preset, isMobile, mobileDensity, desktopDensity],
  );

  if (!initialized) return null;

  return (
    <Particles
      options={options}
      className="absolute inset-0 -z-10 pointer-events-none"
    />
  );
}

export default ParticleBackground;
