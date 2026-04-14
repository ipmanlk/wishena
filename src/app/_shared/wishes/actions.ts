"use server";

import {
  type FilterTemplatesOptions,
  type FilterTemplatesResult,
  filterTemplates,
} from "@templates/wishes";

export async function loadTemplatesAction(
  options: FilterTemplatesOptions,
): Promise<FilterTemplatesResult> {
  return filterTemplates(options);
}
