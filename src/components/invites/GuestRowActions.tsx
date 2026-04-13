"use client";

import { Check, Copy, ExternalLink, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteGuestAction } from "@/app/(app)/invites/actions";
import type { InviteGuest } from "@/lib/types";

interface GuestRowActionsProps {
  guest: InviteGuest;
  inviteUrl: string;
}

export function GuestRowActions({ guest, inviteUrl }: GuestRowActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${guest.displayName}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteGuestAction(guest.id, guest.projectId);
      if (result.success) {
        router.refresh();
      } else {
        alert("Failed to delete guest. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting guest:", err);
      alert("Failed to delete guest. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopyLink = async () => {
    const fullUrl = `${window.location.origin}${inviteUrl}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      alert("Failed to copy link. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={handleCopyLink}
        className="p-1.5 text-warm-gray-text hover:text-ink hover:bg-warm-gray/20 rounded-md transition-colors"
        title={copied ? "Copied!" : "Copy Invite Link"}
      >
        {copied ? (
          <Check className="w-4 h-4 text-sage" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <Link
        href={inviteUrl}
        target="_blank"
        className="p-1.5 text-warm-gray-text hover:text-ink hover:bg-warm-gray/20 rounded-md transition-colors"
        title="Open Invite Link"
      >
        <ExternalLink className="w-4 h-4" />
      </Link>
      <Link
        href={`/invites/${guest.projectId}/guests/${guest.id}/edit`}
        className="p-1.5 text-warm-gray-text hover:text-ink hover:bg-warm-gray/20 rounded-md transition-colors"
        title="Edit Guest"
      >
        <Pencil className="w-4 h-4" />
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-1.5 text-warm-gray-text hover:text-terracotta hover:bg-terracotta/10 rounded-md transition-colors disabled:opacity-50"
        title="Delete Guest"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
