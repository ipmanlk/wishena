import type { Template, TemplateListItem } from "../types";
import { cherryBlossomTemplate } from "./cherry-blossom";
import { cityLightsTemplate } from "./city-lights";
import { forestCalmTemplate } from "./forest-calm";
import { gentleCelebrationTemplate } from "./gentle-celebration";
import { harvestMoonTemplate } from "./harvest-moon";
import { lavenderFieldsTemplate } from "./lavender-fields";
import { morningCoffeeTemplate } from "./morning-coffee";
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
  morningCoffeeTemplate,
  lavenderFieldsTemplate,
  harvestMoonTemplate,
  cityLightsTemplate,
];

export function getTemplateById(id: string): Template | null {
  return templates.find((t) => t.id === id) || null;
}

function matchesQuery(template: TemplateListItem, q: string | null): boolean {
  if (!q) return true;
  const ql = q.toLowerCase();
  if (template.name.toLowerCase().includes(ql)) return true;
  if (template.description?.toLowerCase().includes(ql)) return true;
  if (template.categories.some((c) => c.toLowerCase().includes(ql)))
    return true;
  return false;
}

function matchesCategories(
  template: TemplateListItem,
  categories: string[] | null,
): boolean {
  if (!categories || categories.length === 0) return true;
  return categories.some((c) => template.categories.includes(c));
}

function toListItem(template: Template): TemplateListItem {
  return {
    id: template.id,
    name: template.name,
    description: template.description,
    isPremium: template.isPremium,
    categories: template.categories,
    preview: template.preview,
  };
}

export interface FilterTemplatesOptions {
  q?: string;
  categories?: string[];
  page?: number;
  limit?: number;
}

export interface FilterTemplatesResult {
  items: TemplateListItem[];
  page: number;
  limit: number;
  total: number;
  categories: string[];
}

export function getAllCategories(): string[] {
  const set = new Set<string>();
  for (const t of templates) {
    for (const c of t.categories) {
      set.add(c);
    }
  }
  return Array.from(set).sort();
}

export function filterTemplates(
  options: FilterTemplatesOptions = {},
): FilterTemplatesResult {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, options.limit ?? 40);
  const q = options.q ?? null;
  const selectedCategories =
    options.categories && options.categories.length > 0
      ? options.categories
      : null;

  const filtered = templates.filter(
    (t) => matchesQuery(t, q) && matchesCategories(t, selectedCategories),
  );

  const start = (page - 1) * limit;
  const end = start + limit;
  const pageItems = filtered.slice(start, end).map(toListItem);

  return {
    items: pageItems,
    page,
    limit,
    total: filtered.length,
    categories: getAllCategories(),
  };
}
