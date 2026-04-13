"use client";

import { useEffect, useState } from "react";
import AudioPlayer from "@/components/wish-elements/AudioPlayer";
import ParticleBackground from "@/components/wish-elements/ParticleBackground";
import { inviteComponentMap } from "@/lib/invite-component-map";
import type {
  InviteGuest,
  InviteProject,
  InviteRsvp,
  InviteTemplate,
} from "@/lib/types";

interface InviteCardRendererProps {
  template: InviteTemplate;
  project: InviteProject;
  guest: InviteGuest;
  currentRsvp?: InviteRsvp;
  isPreview?: boolean;
}

export function InviteCardRenderer({
  template,
  project,
  guest,
  currentRsvp,
  isPreview = false,
}: InviteCardRendererProps) {
  const [mounted, setMounted] = useState(false);
  const { blueprint } = template;

  useEffect(() => {
    // Small delay to ensure smooth entry animations
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`${isPreview ? "h-full overflow-y-auto" : "min-h-[100dvh]"} w-full flex flex-col items-center relative overflow-hidden py-16 ${blueprint.globalStyle}`}
    >
      {/* Particles only on the real page to prevent bleed in dashboard previews */}
      {blueprint.visuals && !isPreview && mounted && (
        <ParticleBackground
          preset={blueprint.visuals.preset}
          mobileDensity={blueprint.visuals.mobileDensity}
          desktopDensity={blueprint.visuals.desktopDensity}
        />
      )}

      {/* Audio player if defined (musical invites) */}
      {blueprint.audio && !isPreview && (
        <AudioPlayer audio={blueprint.audio} isPlaying={mounted} />
      )}

      <div className="z-10 flex flex-col items-center w-full max-w-lg px-6 md:px-8 mx-auto origin-top">
        {mounted &&
          blueprint.modules.map((module) => {
            const Component = inviteComponentMap[module.type];
            if (!Component) return null;

            // Resolve bound value based on source
            let boundValue: unknown;
            if (module.bindSource === "project" && module.bindTo) {
              boundValue = project.payload[module.bindTo];
            } else if (module.bindSource === "guest" && module.bindTo) {
              // Check top-level guest properties first
              if (module.bindTo in guest) {
                boundValue = (guest as unknown as Record<string, unknown>)[
                  module.bindTo
                ];
              } else if (guest.extraData && module.bindTo in guest.extraData) {
                // Fallback to extraData
                boundValue = guest.extraData[module.bindTo];
              }
            }

            // Special case for RSVP context passing
            let rsvpProps = {};
            if (module.type === "rsvp_prompt") {
              rsvpProps = {
                rsvpEnabled: project.rsvpEnabled,
                guestId: guest.id,
                projectId: project.id,
                currentRsvp,
              };
            }

            return (
              <Component
                key={module.id}
                {...module}
                props={module.props}
                value={boundValue}
                prefix={module.prefix}
                animation={module.animation}
                projectPayload={project.payload}
                guest={guest}
                {...rsvpProps}
              />
            );
          })}
      </div>
    </main>
  );
}

export default InviteCardRenderer;
