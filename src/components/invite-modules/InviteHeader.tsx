import { motion } from "framer-motion";
import type { InviteModule } from "@/lib/types";
import { cn } from "@/lib/utils";

interface InviteHeaderProps extends InviteModule {
  value?: string;
}

export function InviteHeader({ props, value, animation }: InviteHeaderProps) {
  const text = value || (props?.text as string) || "";
  const className = props?.className as string;

  if (!text) return null;

  const content = (
    <h3 className={cn("whitespace-pre-line", className)}>{text}</h3>
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

  return <div>{content}</div>;
}
