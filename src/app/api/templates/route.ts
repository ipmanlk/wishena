import type { NextRequest } from "next/server";
import { templates } from "@/lib/templates";

export const runtime = "edge";

function matchesQuery(t: any, q: string | null) {
  if (!q) return true;
  const ql = q.toLowerCase();
  if (t.name.toLowerCase().includes(ql)) return true;
  if (t.description && t.description.toLowerCase().includes(ql)) return true;
  if (
    t.categories &&
    t.categories.some((c: string) => c.toLowerCase().includes(ql))
  )
    return true;
  return false;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const pageParam = url.searchParams.get("page") || "1";
  const limitParam = url.searchParams.get("limit") || "40";

  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const limit = Math.max(1, parseInt(limitParam, 10) || 40);

  const filtered = templates.filter((t) => matchesQuery(t, q));

  const start = (page - 1) * limit;
  const end = start + limit;

  const pageItems = filtered.slice(start, end);

  return new Response(
    JSON.stringify({
      items: pageItems,
      page,
      limit,
      total: filtered.length,
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}
