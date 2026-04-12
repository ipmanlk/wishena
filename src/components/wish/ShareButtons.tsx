"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareButtonsProps {
  wishId: string;
}

export function ShareButtons({ wishId }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/w/${wishId}`
      : `/w/${wishId}`;

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleNativeShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: "Someone sent you a wish!",
          text: "Open to view your special message ✨",
          url,
        });
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40">
      <button
        onClick={handleCopy}
        type="button"
        className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg text-sm font-medium text-ink hover:bg-white transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {canShare && (
        <button
          onClick={handleNativeShare}
          type="button"
          className="flex items-center gap-2 px-5 py-2.5 bg-terracotta text-white rounded-full shadow-lg shadow-terracotta/20 text-sm font-medium hover:bg-coral transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      )}
    </div>
  );
}

export default ShareButtons;
