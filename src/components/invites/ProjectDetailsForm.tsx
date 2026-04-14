"use client";

import { Loader2, Plus, Settings2, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createInviteProjectAction,
  updateInviteProjectAction,
} from "@/app/_shared/invites/actions";
import type { GuestFieldDefinition, InviteTemplate } from "@/lib/types";

interface ProjectDetailsFormProps {
  template: InviteTemplate;
  initialData?: {
    id: string;
    title: string;
    payload: Record<string, string>;
    rsvpEnabled: boolean;
    guestFieldDefinitions: GuestFieldDefinition[];
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

  const [guestFields, setGuestFields] = useState<GuestFieldDefinition[]>(
    initialData?.guestFieldDefinitions || [],
  );

  const handleChange = (key: string, value: string) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddField = () => {
    setGuestFields((prev) => [
      ...prev,
      {
        key: `custom_${nanoid(8)}`,
        label: "",
        type: "text",
        required: false,
        isPublic: false,
      },
    ]);
  };

  const handleUpdateField = (
    index: number,
    updates: Partial<GuestFieldDefinition>,
  ) => {
    setGuestFields((prev) => {
      const nw = [...prev];
      nw[index] = { ...nw[index], ...updates };
      return nw;
    });
  };

  const handleRemoveField = (index: number) => {
    setGuestFields((prev) => {
      const nw = [...prev];
      nw.splice(index, 1);
      return nw;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    // validate guest field labels are not empty
    if (guestFields.some((f) => !f.label.trim())) {
      alert("All custom guest fields must have a label.");
      return;
    }

    setLoading(true);

    try {
      if (isEditing) {
        const res = await updateInviteProjectAction(
          initialData?.id,
          payload,
          title,
          rsvpEnabled,
          guestFields,
        );
        if (res.success) {
          router.push(`/me/invites/${initialData?.id}`);
          router.refresh();
        }
      } else {
        const res = await createInviteProjectAction(
          template.id,
          template.inviteKind,
          payload,
          title,
          rsvpEnabled,
          guestFields,
        );
        if (res.success) {
          router.push(`/me/invites/${res.id}`);
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
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-zinc-400" />
          Configure Guest Information
        </h2>

        <p className="text-sm text-zinc-600 mb-4">
          Define what information you want to collect for each guest. You can
          choose whether this information is shown publicly on their invite card
          or kept private. For example: Dietary Requirements, Plus One Names,
          Song Requests, etc.
        </p>

        <div className="space-y-4">
          {guestFields.map((field, index) => (
            <div
              key={field.key}
              className="flex flex-col gap-3 p-4 border border-zinc-200 rounded-xl bg-zinc-50/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-800">
                    Field {index + 1}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="text-zinc-400 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`field-${field.key}-label`}
                    className="block text-xs font-medium text-zinc-500 mb-1"
                  >
                    Label
                  </label>
                  <input
                    id={`field-${field.key}-label`}
                    type="text"
                    required
                    value={field.label}
                    onChange={(e) =>
                      handleUpdateField(index, { label: e.target.value })
                    }
                    placeholder="e.g. Dietary Requirements"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-400 text-zinc-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`field-${field.key}-type`}
                    className="block text-xs font-medium text-zinc-500 mb-1"
                  >
                    Type
                  </label>
                  <select
                    id={`field-${field.key}-type`}
                    value={field.type}
                    onChange={(e) =>
                      handleUpdateField(index, {
                        type: e.target.value as "text" | "textarea",
                      })
                    }
                    className="w-full px-3 py-1.5 text-sm bg-white border border-zinc-200 rounded-lg outline-none focus:border-zinc-400 text-zinc-900"
                  >
                    <option value="text">Short Text</option>
                    <option value="textarea">Long Text</option>
                  </select>
                </div>
                <div className="sm:col-span-2 flex items-center justify-between mt-1 pt-3 border-t border-zinc-200/60">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        handleUpdateField(index, { required: e.target.checked })
                      }
                      className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                    />
                    <span className="text-sm text-zinc-700">Required</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-sm">
                    <input
                      type="checkbox"
                      checked={field.isPublic}
                      onChange={(e) =>
                        handleUpdateField(index, { isPublic: e.target.checked })
                      }
                      className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                    />
                    <span className="text-sm font-medium text-zinc-800">
                      👁 Shown on Invite (Public)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddField}
          className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors py-2"
        >
          <Plus className="w-4 h-4" />
          Add Custom Field
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border space-y-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-zinc-900">
          Template Design Inputs
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
