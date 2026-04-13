"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createInviteProjectAction,
  updateInviteProjectAction,
} from "@/app/(app)/invites/actions";
import type { InviteTemplate } from "@/lib/types";

interface ProjectDetailsFormProps {
  template: InviteTemplate;
  initialData?: {
    id: string;
    title: string;
    payload: Record<string, string>;
    rsvpEnabled: boolean;
  };
}

export function ProjectDetailsForm({
  template,
  initialData,
}: ProjectDetailsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title || "");
  const [rsvpEnabled, setRsvpEnabled] = useState(
    initialData?.rsvpEnabled ?? false,
  );
  const [payload, setPayload] = useState<Record<string, string>>(
    initialData?.payload || {},
  );

  const handleChange = (key: string, value: string) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (isEditing) {
        const res = await updateInviteProjectAction(
          initialData?.id,
          payload,
          title,
          rsvpEnabled,
        );
        if (res.success) {
          router.push(`/invites/${initialData?.id}`);
          router.refresh();
        }
      } else {
        const res = await createInviteProjectAction(
          template.id,
          template.inviteKind,
          payload,
          title,
          rsvpEnabled,
        );
        if (res.success) {
          router.push(`/invites/${res.id}`);
          router.refresh();
        }
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save project.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      <div className="bg-white p-6 rounded-2xl border space-y-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-zinc-900">
          Project Settings
        </h2>

        <div>
          <label
            htmlFor="project-title"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Project Internal Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="project-title"
            type="text"
            required
            placeholder="e.g. Sarah & James Wedding"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900"
          />
          <p className="text-xs text-zinc-500 mt-1">
            This is for your dashboard only. Guests won't see this.
          </p>
        </div>

        <div className="pt-2">
          <label className="flex items-center space-x-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 cursor-pointer hover:bg-zinc-100 transition-colors">
            <input
              type="checkbox"
              checked={rsvpEnabled}
              onChange={(e) => setRsvpEnabled(e.target.checked)}
              className="w-5 h-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 outline-none"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-900">
                Enable RSVP System
              </span>
              <span className="text-xs text-zinc-500 mt-0.5">
                Guests will see Joyfully Accept / Regretfully Decline buttons on
                their card.
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border space-y-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-zinc-900">
          Event Details
        </h2>

        {template.blueprint.projectInputs.map((input) => (
          <div key={input.key}>
            <label
              htmlFor={`input-${input.key}`}
              className="block text-sm font-medium text-zinc-700 mb-1"
            >
              {input.label}{" "}
              {input.required && <span className="text-rose-500">*</span>}
            </label>

            {input.type === "textarea" ? (
              <textarea
                id={`input-${input.key}`}
                required={input.required}
                placeholder={input.placeholder}
                maxLength={input.maxLength}
                value={payload[input.key] || ""}
                onChange={(e) => handleChange(input.key, e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900 resize-none"
              />
            ) : (
              <input
                id={`input-${input.key}`}
                type={input.type}
                required={input.required}
                placeholder={input.placeholder}
                maxLength={input.maxLength}
                value={payload[input.key] || ""}
                onChange={(e) => handleChange(input.key, e.target.value)}
                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900"
              />
            )}
            {input.description && (
              <p className="text-xs text-zinc-500 mt-1">{input.description}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-zinc-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center min-w-[140px]"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isEditing ? (
            "Save Changes"
          ) : (
            "Create Project"
          )}
        </button>
      </div>
    </form>
  );
}
