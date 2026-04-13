import { motion } from "framer-motion";
import type { InviteModule } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GuestAddressProps extends InviteModule {
  value?: string;
}

export function GuestAddress({
  props,
  value,
  prefix,
  animation,
}: GuestAddressProps) {
  const text = value || "";
  const className = props?.className as string;

  if (!text) return null;

  const fullText = `${prefix || ""}${text}`;

  const content = (
    <h2 className={cn("whitespace-pre-line", className)}>{fullText}</h2>
  );

  if (animation === "fade_up") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  }

  if (animation === "typewriter") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className={cn("overflow-hidden whitespace-nowrap", className)}
      >
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          className="inline-block overflow-hidden align-bottom"
        >
          {fullText}
        </motion.span>
      </motion.div>
    );
  }

  return <div>{content}</div>;
}
