import type { Template } from "../types";
import { gentleCelebrationTemplate } from "./gentle-celebration";
import { neonBirthdayTemplate } from "./neon-birthday";

export const templates: Template[] = [
  neonBirthdayTemplate,
  gentleCelebrationTemplate,
];

export function getTemplateById(id: string): Template | null {
  return templates.find((t) => t.id === id) || null;
}
