"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { wishRepository } from "@/lib/storage/wish-repository";
import { templates } from "@/lib/templates";
import type { Template } from "@/lib/types";
import WishRenderer from "@/components/wish/WishRenderer";

export default function CreatePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);

  const handleSelect = (template: Template) => {
    setSelectedTemplate(template);
    const initial: Record<string, string> = {};
    template.blueprint.requiredInputs.forEach((input) => {
      initial[input.key] = "";
    });
    setFormData(initial);
  };

  const handleBack = () => {
    setSelectedTemplate(null);
    setFormData({});
  };

  const handleCreate = () => {
    if (!selectedTemplate) return;
    setIsCreating(true);

    const wish = {
      id: nanoid(10),
      templateId: selectedTemplate.id,
      payload: formData,
      createdAt: new Date().toISOString(),
    };

    wishRepository.save(wish);
    router.push(`/w/${wish.id}`);
  };

  const allFilled = selectedTemplate
    ? selectedTemplate.blueprint.requiredInputs.every((field) =>
        field.required ? formData[field.key]?.trim() : true,
      )
    : false;

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!selectedTemplate ? (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <header className="text-center mb-16">
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

              <div className="grid md:grid-cols-2 gap-6">
                {templates.map((template) => (
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
                      style={{
                        background:
                          template.id === "neon-birthday"
                            ? "linear-gradient(135deg, #080B1A 0%, #1a0533 100%)"
                            : "linear-gradient(135deg, #FEFAF4 0%, #F5E8C8 100%)",
                      }}
                    >
                      {template.id === "neon-birthday" && (
                        <div className="h-full flex flex-col items-center justify-center gap-1">
                          <span
                            className="text-xl font-extrabold"
                            style={{
                              color: "#FF2D7C",
                              textShadow:
                                "0 0 7px #FF2D7C, 0 0 18px #FF2D7C, 0 0 36px #FF2D7C80",
                            }}
                          >
                            Happy Birthday!
                          </span>
                          <span
                            className="text-xs tracking-[0.3em] uppercase"
                            style={{
                              color: "#00F5D4",
                              textShadow: "0 0 8px #00F5D4",
                            }}
                          >
                            midnight glow
                          </span>
                        </div>
                      )}
                      {template.id === "gentle-celebration" && (
                        <div className="h-full flex flex-col items-center justify-center gap-1">
                          <span
                            className="text-xl font-semibold italic"
                            style={{ color: "#C9983A", fontFamily: "Georgia, serif" }}
                          >
                            Sophia
                          </span>
                          <span
                            className="text-xs tracking-[0.3em] uppercase"
                            style={{ color: "#9C5A5A" }}
                          >
                            golden hour
                          </span>
                        </div>
                      )}
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
          ) : (
            <motion.div
              key="customize"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 text-warm-gray-text hover:text-ink mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to templates</span>
              </button>

              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl text-ink mb-2">Make it personal</h2>
                  <p className="text-warm-gray-text mb-8">
                    Fill in the details for your wish
                  </p>

                  <div className="space-y-6">
                    {selectedTemplate.blueprint.requiredInputs.map((field) => (
                      <div key={field.key}>
                        <label
                          htmlFor={field.key}
                          className="block text-sm font-medium text-ink mb-2"
                        >
                          {field.label}
                        </label>
                        {field.type === "textarea" ? (
                          <textarea
                            id={field.key}
                            value={formData[field.key] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.key]: e.target.value,
                              })
                            }
                            maxLength={field.maxLength}
                            placeholder={field.placeholder}
                            rows={4}
                            className="w-full bg-transparent border-b-2 border-warm-gray/30 py-3 px-1 text-ink placeholder-muted focus:border-terracotta focus:outline-none transition-colors resize-none"
                          />
                        ) : (
                          <input
                            id={field.key}
                            type="text"
                            value={formData[field.key] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [field.key]: e.target.value,
                              })
                            }
                            maxLength={field.maxLength}
                            placeholder={field.placeholder}
                            className="w-full bg-transparent border-b-2 border-warm-gray/30 py-3 px-1 text-ink placeholder-muted focus:border-terracotta focus:outline-none transition-colors"
                          />
                        )}
                        {field.maxLength && (
                          <p className="text-xs text-muted mt-2 text-right">
                            {formData[field.key]?.length || 0}/{field.maxLength}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleCreate}
                    disabled={!allFilled || isCreating}
                    className="mt-10 w-full bg-terracotta text-white py-4 px-6 rounded-xl font-medium shadow-lg shadow-terracotta/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all"
                  >
                    {isCreating ? "Creating..." : "Create your wish"}
                  </button>
                </div>

                <div className="hidden md:block">
                  <div className="sticky top-8">
                    <p className="text-sm text-warm-gray-text mb-3">Preview</p>
                    <div
                      className="aspect-9/16 rounded-2xl shadow-xl overflow-hidden relative"
                    >
                      <WishRenderer template={selectedTemplate} payload={formData} isPreview />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
