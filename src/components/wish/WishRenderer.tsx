"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AudioPlayer from "@/components/wish-elements/AudioPlayer";
import ParticleBackground from "@/components/wish-elements/ParticleBackground";
import TapToReveal from "@/components/wish-elements/TapToReveal";
import { animationVariants, componentMap } from "@/lib/component-map";
import type { Template } from "@/lib/types";

interface WishRendererProps {
  template: Template;
  payload: Record<string, string>;
}

export function WishRenderer({ template, payload }: WishRendererProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const { blueprint } = template;

  return (
    <main
      className={`min-h-[100dvh] w-full flex flex-col items-center relative ${blueprint.globalStyle}`}
    >
      {blueprint.visuals && (
        <ParticleBackground
          preset={blueprint.visuals.preset}
          mobileDensity={blueprint.visuals.mobileDensity}
          desktopDensity={blueprint.visuals.desktopDensity}
        />
      )}

      {blueprint.audio && (
        <AudioPlayer
          synth={blueprint.audio.synth as "FMSynth" | "AMSynth" | "Synth"}
          tempo={blueprint.audio.tempo}
          melody={blueprint.audio.melody}
          isPlaying={isRevealed}
        />
      )}

      <TapToReveal
        isRevealed={isRevealed}
        onReveal={() => setIsRevealed(true)}
        previewText={payload[blueprint.requiredInputs[0]?.key]}
      />

      <div className="z-10 flex flex-col items-center w-full max-w-md px-4">
        {blueprint.modules.map((module, index) => {
          const Component = componentMap[module.type];
          if (!Component) return null;

          const text = module.bindTo ? payload[module.bindTo] : undefined;
          const animation = module.animation
            ? animationVariants[module.animation]
            : null;

          return (
            <motion.div
              key={module.id}
              initial={animation?.initial || { opacity: 0 }}
              animate={
                isRevealed
                  ? animation?.animate || { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{
                ...animation?.transition,
                delay: index * 0.2,
              }}
              className="w-full mb-4"
            >
              <Component
                className={module.style}
                text={text}
                prefix={module.prefix}
                {...module.props}
              />
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}

export default WishRenderer;
