"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";

interface ParticleBackgroundProps {
  preset: "glow-dust" | "confetti" | "snow";
  mobileDensity: number;
  desktopDensity: number;
}

const presets = {
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
