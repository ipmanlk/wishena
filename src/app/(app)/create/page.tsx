"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Template } from "@/lib/types";

const ALL_CATEGORY = "All";

function formatCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

async function fetchTemplates({
  q,
  page,
  limit,
}: {
  q?: string;
  page: number;
  limit: number;
}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  params.set("page", String(page));
  params.set("limit", String(limit));

  const res = await fetch(`/api/templates?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to load templates");
  return res.json();
}

export default function CreatePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [templates, setTemplates] = useState<Template[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(40);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 220);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    // reset when search changes
    setTemplates([]);
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchTemplates({ q: debouncedSearch || undefined, page, limit })
      .then((data) => {
        if (!mounted) return;
        setTemplates((prev) =>
          page === 1 ? data.items : [...prev, ...data.items],
        );
        setTotal(data.total);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to load templates");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [debouncedSearch, page, limit]);

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    for (const t of templates) {
      for (const c of t.categories) set.add(c);
    }
    return [ALL_CATEGORY, ...Array.from(set).sort()];
  }, [templates]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    ALL_CATEGORY,
  ]);

  const toggleCategory = (category: string) => {
    if (category === ALL_CATEGORY) {
      setSelectedCategories([ALL_CATEGORY]);
      return;
    }

    setSelectedCategories((prev) => {
      const withoutAll = prev.filter((c) => c !== ALL_CATEGORY);
      if (withoutAll.includes(category)) {
        const newSelection = withoutAll.filter((c) => c !== category);
        return newSelection.length === 0 ? [ALL_CATEGORY] : newSelection;
      }
      return [...withoutAll, category];
    });
  };

  const handleSelect = (template: Template) => {
    router.push(`/create/${template.id}`);
  };

  const visibleTemplates = useMemo(() => {
    if (selectedCategories.includes(ALL_CATEGORY)) return templates;
    return templates.filter((t) =>
      t.categories.some((c) => selectedCategories.includes(c)),
    );
  }, [templates, selectedCategories]);

  const canLoadMore = templates.length < total;

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <header className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-terracotta mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Create a wish</span>
            </div>
            <h1 className="text-4xl md:text-5xl text-ink mb-4">
              Choose a template
            </h1>
            <p className="text-warm-gray-text text-lg max-w-md mx-auto">
              Pick a style that matches the moment you&apos;re celebrating
            </p>
          </header>

          <div className="flex items-center justify-between gap-4 mb-6">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates by name, description or category"
              className="flex-1 px-4 py-3 rounded-xl border bg-white"
            />
            <div className="ml-4 text-sm text-warm-gray-text">
              {total} results
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {allCategories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-terracotta text-white shadow-md"
                      : "bg-white text-warm-gray-text hover:bg-warm-gray/10 border border-warm-gray/20"
                  }`}
                >
                  {formatCategoryLabel(category)}
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {visibleTemplates.map((template) => (
              <motion.button
                key={template.id}
                type="button"
                onClick={() => handleSelect(template)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group relative text-left bg-off-white rounded-2xl border border-warm-gray/20 p-6 shadow-sm hover:shadow-md transition-all"
              >
                {template.isPremium && (
                  <span className="absolute right-4 top-4 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                    Premium
                  </span>
                )}
                <div
                  className="h-32 rounded-xl mb-4 overflow-hidden relative"
                  style={{ background: template.preview.background }}
                >
                  <div className="h-full flex flex-col items-center justify-center gap-1">
                    {template.preview.lines.map((line) => (
                      <span
                        key={line.text}
                        className={line.className}
                        style={line.style}
                      >
                        {line.text}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl text-ink font-medium mb-2">
                  {template.name}
                </h3>
                <p className="text-warm-gray-text text-sm">
                  {template.description}
                </p>
              </motion.button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            {loading ? (
              <div className="text-warm-gray-text">Loading…</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : canLoadMore ? (
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-3 bg-white border rounded-xl"
              >
                Load more
              </button>
            ) : (
              <div className="text-warm-gray-text">No more templates</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
