"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import type { InviteModule, InviteRsvp } from "@/lib/types";
import { cn } from "@/lib/utils";
import { RsvpButtons } from "../invites/RsvpButtons";

interface RsvpPromptProps extends InviteModule {
  value?: string; // rsvpDate string
  rsvpEnabled?: boolean;
  guestId?: string;
  projectId?: string;
  currentRsvp?: InviteRsvp;
}

export function RsvpPrompt({
  props,
  value,
  animation,
  rsvpEnabled,
  guestId,
  projectId,
  currentRsvp,
}: RsvpPromptProps) {
  const className = props?.className as string;
  const textStyle = props?.textStyle as string;
  const buttonConfig = props?.buttonConfig as {
    theme?: "rose" | "gold" | "minimal";
  };

  const rawDate = value;
  let formattedDate = rawDate;
  try {
    if (rawDate) {
      formattedDate = format(new Date(rawDate), "MMMM do, yyyy");
    }
  } catch (_e) {
    // fallback
  }

  const promptText = `Kindly RSVP${formattedDate ? ` by ${formattedDate}` : ""}`;

  const content = (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn(textStyle)}>{promptText}</div>

      {rsvpEnabled && guestId && projectId && (
        <RsvpButtons
          guestId={guestId}
          projectId={projectId}
          currentRsvp={currentRsvp?.response}
          theme={buttonConfig?.theme}
        />
      )}
    </div>
  );

  if (animation === "fade_up") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        {content}
      </motion.div>
    );
  }

  return <div>{content}</div>;
}
