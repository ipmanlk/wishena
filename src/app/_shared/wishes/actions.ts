"use server";

import {
  type FilterTemplatesOptions,
  type FilterTemplatesResult,
  filterTemplates,
} from "@/lib/templates";

export async function loadTemplatesAction(
  options: FilterTemplatesOptions,
): Promise<FilterTemplatesResult> {
  return filterTemplates(options);
}
