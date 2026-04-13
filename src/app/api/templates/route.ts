import { templates } from "@/lib/templates";
import type { Template } from "@/lib/types";

function matchesQuery(template: Template, q: string | null): boolean {
  if (!q) return true;
  const ql = q.toLowerCase();
  if (template.name.toLowerCase().includes(ql)) return true;
  if (template.description && template.description.toLowerCase().includes(ql))
    return true;
  if (template.categories.some((c) => c.toLowerCase().includes(ql)))
    return true;
  return false;
}

function matchesCategories(
  template: Template,
  categories: string[] | null,
): boolean {
  if (!categories || categories.length === 0) return true;
  return categories.some((c) => template.categories.includes(c));
}

function getAllCategories(): string[] {
  const set = new Set<string>();
  for (const t of templates) {
    for (const c of t.categories) {
      set.add(c);
    }
  }
  return Array.from(set).sort();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const categoriesParam = url.searchParams.get("categories");
  const pageParam = url.searchParams.get("page") || "1";
  const limitParam = url.searchParams.get("limit") || "40";

  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const limit = Math.max(1, parseInt(limitParam, 10) || 40);

  const selectedCategories = categoriesParam
    ? categoriesParam.split(",").filter(Boolean)
    : null;

  const filtered = templates.filter(
    (t) => matchesQuery(t, q) && matchesCategories(t, selectedCategories),
  );

  const start = (page - 1) * limit;
  const end = start + limit;

  const pageItems = filtered.slice(start, end);

  return new Response(
    JSON.stringify({
      items: pageItems,
      page,
      limit,
      total: filtered.length,
      categories: getAllCategories(),
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}
