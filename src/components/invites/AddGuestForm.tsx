"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addGuestAction } from "@/app/(app)/invites/actions";
import type { InviteProject } from "@/lib/types";

interface AddGuestFormProps {
  project: InviteProject;
  onSuccess?: () => void;
}

export function AddGuestForm({ project, onSuccess }: AddGuestFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [personalNote, setPersonalNote] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [customFields, setCustomFields] = useState<
    Record<string, { label: string; value: string; isPublic: boolean }>
  >({});

  const handleCustomFieldChange = (
    key: string,
    label: string,
    value: string,
    isPublic: boolean,
  ) => {
    setCustomFields((prev) => ({
      ...prev,
      [key]: { label, value, isPublic },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !displayName.trim()) return;

    setLoading(true);
    try {
      const result = await addGuestAction(
        project.id,
        displayName.trim(),
        personalNote.trim() || undefined,
        internalNote.trim() || undefined,
        email.trim() || undefined,
        contactNumber.trim() || undefined,
        customFields,
      );

      if (result.success) {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push(`/invites/${project.id}`);
          router.refresh();
        }
      } else {
        alert("Failed to add guest. Please try again.");
      }
    } catch (err) {
      console.error("Error adding guest:", err);
      alert("Failed to add guest. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="guest-displayName"
            className="block text-sm font-medium text-zinc-900 mb-1"
          >
            Guest Name(s) <span className="text-rose-500">*</span>
          </label>
          <input
            id="guest-displayName"
            type="text"
            required
            placeholder="e.g., Priya & Vikram or John Smith"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900"
          />
          <p className="text-xs text-zinc-500 mt-1">
            How the guest's name appears on their invitation
          </p>
        </div>

        <div>
          <label
            htmlFor="guest-personalNote"
            className="block text-sm font-medium text-zinc-900 mb-1"
          >
            Personal Note{" "}
            <span className="text-zinc-500 font-normal">(Optional)</span>
          </label>
          <textarea
            id="guest-personalNote"
            placeholder="e.g., We can't wait to celebrate with you!"
            value={personalNote}
            onChange={(e) => setPersonalNote(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900 resize-none"
          />
          <p className="text-xs text-zinc-500 mt-1">
            A personal message shown on this guest's invitation card
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-200 space-y-4">
        <h3 className="text-sm font-semibold text-zinc-900 flex items-center justify-between">
          Contact Information{" "}
          <span className="text-xs font-normal px-2 py-1 bg-zinc-100 text-zinc-600 rounded">
            🔒 Private
          </span>
        </h3>
        <p className="text-xs text-zinc-500 -mt-2 mb-4">
          For your reference only. Not shown on the invite.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="guest-email"
              className="block text-sm font-medium text-zinc-700 mb-1"
            >
              Email
            </label>
            <input
              id="guest-email"
              type="email"
              placeholder="priya@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900"
            />
          </div>
          <div>
            <label
              htmlFor="guest-contact"
              className="block text-sm font-medium text-zinc-700 mb-1"
            >
              Contact Number
            </label>
            <input
              id="guest-contact"
              type="tel"
              placeholder="+1 234 567 8900"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-200 space-y-4">
        <h3 className="text-sm font-semibold text-zinc-900 flex items-center justify-between">
          Internal Note{" "}
          <span className="text-xs font-normal px-2 py-1 bg-zinc-100 text-zinc-600 rounded">
            🔒 Private
          </span>
        </h3>
        <p className="text-xs text-zinc-500 -mt-2 mb-4">
          Internal notes for your reference. Never shown to guests.
        </p>

        <textarea
          id="guest-internalNote"
          placeholder="e.g., Dietary requirements, plus one details, etc."
          value={internalNote}
          onChange={(e) => setInternalNote(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900 resize-none"
        />
      </div>

      {project.guestFieldDefinitions &&
        project.guestFieldDefinitions.length > 0 && (
          <div className="pt-6 border-t border-zinc-200 space-y-4">
            <h3 className="text-sm font-semibold text-zinc-900 mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              {project.guestFieldDefinitions.map((field) => (
                <div key={field.key}>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor={`custom-${field.key}`}
                      className="block text-sm font-medium text-zinc-700"
                    >
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-rose-500">*</span>
                      )}
                    </label>
                    {field.isPublic ? (
                      <span className="text-xs font-medium px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded">
                        👁 Public
                      </span>
                    ) : (
                      <span className="text-xs font-medium px-2 py-0.5 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded">
                        🔒 Private
                      </span>
                    )}
                  </div>

                  {field.type === "textarea" ? (
                    <textarea
                      id={`custom-${field.key}`}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={customFields[field.key]?.value || ""}
                      onChange={(e) =>
                        handleCustomFieldChange(
                          field.key,
                          field.label,
                          e.target.value,
                          field.isPublic,
                        )
                      }
                      rows={3}
                      className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900 resize-none"
                    />
                  ) : (
                    <input
                      id={`custom-${field.key}`}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={customFields[field.key]?.value || ""}
                      onChange={(e) =>
                        handleCustomFieldChange(
                          field.key,
                          field.label,
                          e.target.value,
                          field.isPublic,
                        )
                      }
                      className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      <div className="pt-6 border-t border-zinc-200 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 text-zinc-700 hover:text-zinc-900 font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !displayName.trim()}
          className="bg-zinc-900 text-white px-8 py-2 rounded-xl font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Guest"}
        </button>
      </div>
    </form>
  );
}
