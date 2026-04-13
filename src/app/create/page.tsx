"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { templates } from "@/lib/templates";
import type { Template } from "@/lib/types";

const ALL_CATEGORY = "All";

function getAllCategories(): string[] {
  const categorySet = new Set<string>();
  templates.forEach((t) => t.categories.forEach((c) => categorySet.add(c)));
  return [ALL_CATEGORY, ...Array.from(categorySet).sort()];
}

function formatCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function CreatePage() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    ALL_CATEGORY,
  ]);

  const allCategories = useMemo(() => getAllCategories(), []);

  const filteredTemplates = useMemo(() => {
    if (selectedCategories.includes(ALL_CATEGORY)) {
      return templates;
    }
    return templates.filter((t) =>
      t.categories.some((c) => selectedCategories.includes(c)),
    );
  }, [selectedCategories]);

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

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <header className="text-center mb-12">
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

          <div className="flex flex-wrap justify-center gap-2 mb-10">
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
            {filteredTemplates.map((template) => (
              <motion.button
                key={template.id}
                type="button"
                onClick={() => handleSelect(template)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group text-left bg-off-white rounded-2xl border border-warm-gray/20 p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div
                  className="h-32 rounded-xl mb-4 overflow-hidden relative"
                  style={{ background: template.preview.background }}
                >
                  <div className="h-full flex flex-col items-center justify-center gap-1">
                    {template.preview.lines.map((line, index) => (
                      <span
                        key={index}
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
        </motion.div>
      </div>
    </div>
  );
}
