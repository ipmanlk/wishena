import { format } from "date-fns";
import { motion } from "framer-motion";
import type { InviteModule } from "@/lib/types";
import { cn } from "@/lib/utils";

interface EventDetailsProps extends InviteModule {
  projectPayload: Record<string, string>;
}

export function EventDetails({
  props,
  projectPayload,
  animation,
}: EventDetailsProps) {
  const className = props?.className as string;
  const dateStyle = props?.dateStyle as string;
  const timeStyle = props?.timeStyle as string;
  const venueStyle = props?.venueStyle as string;

  const dateRaw = projectPayload.date;
  const timeRaw = projectPayload.time;
  const venue = projectPayload.venue;

  if (!dateRaw && !timeRaw && !venue) return null;

  let formattedDate = dateRaw;
  try {
    if (dateRaw) {
      formattedDate = format(new Date(dateRaw), "EEEE, MMMM do, yyyy");
    }
  } catch (_e) {
    // raw fallback
  }

  const content = (
    <div className={cn("flex flex-col items-center", className)}>
      {dateRaw && (
        <div className={cn("w-full", dateStyle)}>{formattedDate}</div>
      )}

      {timeRaw && <div className={cn("w-full", timeStyle)}>{timeRaw}</div>}

      {venue && (
        <div className={cn("w-full whitespace-pre-line mt-2", venueStyle)}>
          {venue}
        </div>
      )}
    </div>
  );

  if (animation === "fade_up") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        {content}
      </motion.div>
    );
  }

  return <div>{content}</div>;
}
