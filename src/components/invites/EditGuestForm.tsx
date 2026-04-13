"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateGuestAction } from "@/app/(app)/invites/actions";
import type { InviteGuest, InviteTemplate } from "@/lib/types";

interface EditGuestFormProps {
  projectId: string;
  guest: InviteGuest;
  template: InviteTemplate;
  onSuccess?: () => void;
}

export function EditGuestForm({
  projectId,
  guest,
  template,
  onSuccess,
}: EditGuestFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(guest.name);
  const [note, setNote] = useState(guest.note || "");
  const [email, setEmail] = useState(guest.email || "");
  const [contactNumber, setContactNumber] = useState(guest.contactNumber || "");
  const [extraData, setExtraData] = useState<Record<string, string>>(
    guest.extraData || {},
  );

  const handleExtraDataChange = (key: string, value: string) => {
    setExtraData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !name.trim()) return;

    setLoading(true);
    try {
      const result = await updateGuestAction(
        guest.id,
        projectId,
        name.trim(),
        note.trim() || undefined,
        email.trim() || undefined,
        contactNumber.trim() || undefined,
        extraData,
      );

      if (result.success) {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push(`/invites/${projectId}`);
          router.refresh();
        }
      } else {
        alert("Failed to update guest. Please try again.");
      }
    } catch (err) {
      console.error("Error updating guest:", err);
      alert("Failed to update guest. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="guest-name"
          className="block text-sm font-medium text-zinc-700 mb-1"
        >
          Guest Name <span className="text-rose-500">*</span>
        </label>
        <input
          id="guest-name"
          type="text"
          required
          placeholder="e.g. John Smith"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900"
        />
      </div>

      <div>
        <label
          htmlFor="guest-note"
          className="block text-sm font-medium text-zinc-700 mb-1"
        >
          Personal Note
        </label>
        <textarea
          id="guest-note"
          placeholder="e.g. We can't wait to celebrate with you!"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900 resize-none"
        />
        <p className="text-xs text-zinc-500 mt-1">
          This note will appear on the guest's invitation card. Keep it short
          and sweet.
        </p>
      </div>

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
            placeholder="john@example.com"
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

      {template.blueprint.guestInputs.length > 0 && (
        <div className="border-t border-zinc-200 pt-6">
          <h3 className="text-sm font-medium text-zinc-900 mb-4">
            Additional Information
          </h3>
          <div className="space-y-4">
            {template.blueprint.guestInputs.map((input) => (
              <div key={input.key}>
                <label
                  htmlFor={`guest-extra-${input.key}`}
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  {input.label}{" "}
                  {input.required && <span className="text-rose-500">*</span>}
                </label>
                {input.type === "textarea" ? (
                  <textarea
                    id={`guest-extra-${input.key}`}
                    required={input.required}
                    placeholder={input.placeholder}
                    maxLength={input.maxLength}
                    value={extraData[input.key] || ""}
                    onChange={(e) =>
                      handleExtraDataChange(input.key, e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900 resize-none"
                  />
                ) : (
                  <input
                    id={`guest-extra-${input.key}`}
                    type={input.type}
                    required={input.required}
                    placeholder={input.placeholder}
                    maxLength={input.maxLength}
                    value={extraData[input.key] || ""}
                    onChange={(e) =>
                      handleExtraDataChange(input.key, e.target.value)
                    }
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900"
                  />
                )}
                {input.description && (
                  <p className="text-xs text-zinc-500 mt-1">
                    {input.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 text-zinc-700 hover:text-zinc-900 font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="bg-zinc-900 text-white px-8 py-2 rounded-xl font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}
