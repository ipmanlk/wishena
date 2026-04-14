import { motion } from "framer-motion";
import type { GuestCustomField, InviteModule } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GuestCustomFieldsProps extends InviteModule {
  guest?: {
    customFields: Record<string, GuestCustomField> | null;
  };
}

export function GuestCustomFields({
  props,
  guest,
  animation,
}: GuestCustomFieldsProps) {
  const customFields = guest?.customFields ?? {};

  const publicFields = Object.entries(customFields)
    .filter(([_, field]) => field.isPublic && field.value)
    .map(([key, field]) => {
      return {
        key,
        label: field.label || key,
        value: field.value,
      };
    });

  if (publicFields.length === 0) return null;

  const containerClassName = props?.className as string;
  const itemClassName = props?.itemClassName as string;
  const labelClassName = props?.labelClassName as string;
  const valueClassName = props?.valueClassName as string;

  const content = (
    <div className={cn("flex flex-col gap-6 w-full", containerClassName)}>
      {publicFields.map((field) => (
        <div
          key={field.key}
          className={cn(
            "flex flex-col items-center justify-center text-center",
            itemClassName,
          )}
        >
          {labelClassName && (
            <span className={cn(labelClassName)}>{field.label}</span>
          )}
          <span className={cn("whitespace-pre-line", valueClassName)}>
            {field.value}
          </span>
        </div>
      ))}
    </div>
  );

  if (animation === "fade_up") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
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
