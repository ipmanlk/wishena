import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { InviteModule } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DecorativeDividerProps extends InviteModule {}

export function DecorativeDivider({
  props,
  animation,
}: DecorativeDividerProps) {
  const className = props?.className as string;
  const variant =
    (props?.variant as "leaf" | "diamond" | "line" | "dot") || "line";

  let content: ReactNode;

  if (variant === "leaf") {
    content = (
      <svg
        className="w-16 h-6 mx-auto"
        viewBox="0 0 64 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Decorative leaf pattern"
      >
        <path
          d="M32 12C28 4 20 4 16 12C20 20 28 20 32 12ZM32 12C36 4 44 4 48 12C44 20 36 20 32 12Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 12H12M52 12H36"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    );
  } else if (variant === "diamond") {
    content = (
      <div className="flex items-center justify-center space-x-2">
        <div className="h-[1px] w-12 bg-current opacity-30"></div>
        <div className="w-2 h-2 rotate-45 border border-current"></div>
        <div className="h-[1px] w-12 bg-current opacity-30"></div>
      </div>
    );
  } else if (variant === "dot") {
    content = (
      <div className="flex items-center justify-center space-x-3">
        <div className="w-1 h-1 rounded-full bg-current"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
        <div className="w-1 h-1 rounded-full bg-current"></div>
      </div>
    );
  } else {
    // line
    content = (
      <div className="flex items-center justify-center">
        <div className="h-[1px] w-24 bg-current opacity-50"></div>
      </div>
    );
  }

  const wrapper = (
    <div className={cn("flex justify-center", className)}>{content}</div>
  );

  if (animation === "fade_up") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {wrapper}
      </motion.div>
    );
  }

  return wrapper;
}
