import type { Template } from "../types";
import { cherryBlossomTemplate } from "./cherry-blossom";
import { forestCalmTemplate } from "./forest-calm";
import { gentleCelebrationTemplate } from "./gentle-celebration";
import { neonBirthdayTemplate } from "./neon-birthday";
import { oceanBreezeTemplate } from "./ocean-breeze";
import { snowyWinterTemplate } from "./snowy-winter";
import { starlightTemplate } from "./starlight";
import { sunsetLoveTemplate } from "./sunset-love";

export const templates: Template[] = [
  neonBirthdayTemplate,
  gentleCelebrationTemplate,
  snowyWinterTemplate,
  oceanBreezeTemplate,
  sunsetLoveTemplate,
  forestCalmTemplate,
  cherryBlossomTemplate,
  starlightTemplate,
];

export function getTemplateById(id: string): Template | null {
  return templates.find((t) => t.id === id) || null;
}
