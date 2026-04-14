import type { InviteTemplate } from "@/lib/types";
import { gardenRomanceTemplate } from "./wedding/garden-romance";
import { goldenCeremonyTemplate } from "./wedding/golden-ceremony";
import { minimalistVowsTemplate } from "./wedding/minimalist-vows";

export const eventTemplates: InviteTemplate[] = [
  gardenRomanceTemplate,
  goldenCeremonyTemplate,
  minimalistVowsTemplate,
];

export function getEventTemplateById(id: string): InviteTemplate | undefined {
  return eventTemplates.find((t) => t.id === id);
}

export function filterEventTemplates(kind: string): InviteTemplate[] {
  return eventTemplates.filter((t) => t.kind === kind);
}

export function getEventKinds(): string[] {
  const kinds = new Set(eventTemplates.map((t) => t.kind));
  return Array.from(kinds);
}

export function getEventCategoriesByKind(kind: string): string[] {
  const set = new Set<string>();
  for (const template of eventTemplates) {
    if (template.kind !== kind) continue;
    for (const category of template.categories) {
      set.add(category);
    }
  }
  return Array.from(set);
}
