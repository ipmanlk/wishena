import { motion } from "framer-motion";
import type { InviteModule } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CustomNoteProps extends InviteModule {
  value?: string;
}

export function CustomNote({ props, value, animation }: CustomNoteProps) {
  const text = value || null; // Will be undefined if guest didn't get a note
  const className = props?.className as string;

  if (!text) return null;

  const content = (
    <p className={cn("whitespace-pre-line", className)}>{text}</p>
  );

  if (animation === "fade_up") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        {content}
      </motion.div>
    );
  }

  return <div>{content}</div>;
}
