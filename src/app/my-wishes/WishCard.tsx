"use client";

import { useState } from "react";
import { Copy, Trash2, ExternalLink, Check } from "lucide-react";
import Link from "next/link";
import { deleteWishAction } from "@/app/my-wishes/actions";

interface WishCardProps {
  wishId: string;
  templateName: string;
  createdAt: string;
}

export function WishCard({ wishId, templateName, createdAt }: WishCardProps) {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const fullUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/w/${wishId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this wish?")) return;
    setIsDeleting(true);
    const success = await deleteWishAction(wishId);
    if (success) {
      setDeleted(true);
    } else {
      setIsDeleting(false);
      alert("Failed to delete wish");
    }
  };

  if (deleted) return null;

  return (
    <div className="bg-white border border-warm-gray/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-4">
      <div className="flex justify-between items-start w-full">
        <div>
          <h3 className="text-xl font-medium text-ink">{templateName} Wish</h3>
          <p className="text-sm text-warm-gray-text mt-1">
            Created on {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex gap-3 w-full mt-2">
        <Link
          href={`/w/${wishId}`}
          className="flex-1 flex justify-center items-center py-2.5 px-4 border border-warm-gray/30 rounded-xl text-sm font-medium text-ink bg-off-white hover:bg-gray-50 transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-2 text-warm-gray-text" />
          Open
        </Link>
        <button
          onClick={handleCopy}
          className="flex-1 flex justify-center items-center py-2.5 px-4 border border-warm-gray/30 rounded-xl text-sm font-medium text-ink bg-off-white hover:bg-gray-50 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-sage" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2 text-warm-gray-text" />
              Share Link
            </>
          )}
        </button>
        <button
          disabled={isDeleting}
          onClick={handleDelete}
          className="flex justify-center items-center p-2.5 border border-red-100 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-colors focus:outline-none disabled:opacity-50"
          aria-label="Delete wish"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
