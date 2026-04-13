import { motion } from "framer-motion";
import type { InviteModule } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HonoreeNamesProps extends InviteModule {
  value?: string;
}

export function HonoreeNames({ props, value, animation }: HonoreeNamesProps) {
  const text = value || "";
  const className = props?.className as string;

  if (!text) return null;

  const content = (
    <h1 className={cn("whitespace-pre-line", className)}>{text}</h1>
  );

  if (animation === "fade_up") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        {content}
      </motion.div>
    );
  }

  if (animation === "scale_in") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        {content}
      </motion.div>
    );
  }

  return <div>{content}</div>;
}
