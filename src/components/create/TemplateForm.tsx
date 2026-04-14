"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GuestLimitModal } from "@/components/auth/GuestLimitModal";
import { VerifyEmailModal } from "@/components/auth/VerifyEmailModal";
import WishRenderer from "@/components/wish/WishRenderer";
import { createWishAction } from "@/lib/auth/actions";
import type { Template } from "@/lib/types";

interface TemplateFormProps {
  template: Template;
  isModal?: boolean;
  onBack?: () => void;
  backHref?: string;
}

export function TemplateForm({
  template,
  isModal = false,
  onBack,
  backHref,
}: TemplateFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    if (backHref) {
      router.push(backHref);
      return;
    }

    router.push("/guest/wishes/new");
  };

  const [showGuestLimit, setShowGuestLimit] = useState(false);
  const [showVerifyLimit, setShowVerifyLimit] = useState(false);

  const handleCreate = async () => {
    setIsCreating(true);

    const result = await createWishAction(template.id, formData);

    if (result.error === "guest_limit_reached") {
      setShowGuestLimit(true);
      setIsCreating(false);
      return;
    }

    if (result.error === "unverified_limit_reached") {
      setShowVerifyLimit(true);
      setIsCreating(false);
      return;
    }

    if (result.success && result.id) {
      router.push(`/w/${result.id}`);
    } else {
      // In case of general failure
      setIsCreating(false);
    }
  };

  const allFilled = template.blueprint.requiredInputs.every((field) =>
    field.required ? formData[field.key]?.trim() : true,
  );

  return (
    <div className={isModal ? "p-6 md:p-8" : "min-h-screen bg-cream"}>
      {!isModal && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-warm-gray-text hover:text-ink mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to templates</span>
          </button>
        </div>
      )}

      <div className={isModal ? "" : "max-w-4xl mx-auto px-6 pb-12"}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl text-ink mb-2">Make it personal</h2>
            <p className="text-warm-gray-text mb-8">
              Fill in the details for your wish
            </p>

            <div className="space-y-6">
              {template.blueprint.requiredInputs.map((field) => (
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
            <div className={isModal ? "sticky top-4" : "sticky top-8"}>
              <p className="text-sm text-warm-gray-text mb-3">Preview</p>
              <div className="aspect-9/16 rounded-2xl shadow-xl overflow-hidden relative">
                <WishRenderer
                  template={template}
                  payload={formData}
                  defaultValues={template.defaultValues}
                  isPreview
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GuestLimitModal
        isOpen={showGuestLimit}
        onClose={() => setShowGuestLimit(false)}
      />
      <VerifyEmailModal
        isOpen={showVerifyLimit}
        onClose={() => setShowVerifyLimit(false)}
      />
    </div>
  );
}
