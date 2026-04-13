"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { submitRsvpAction } from "@/app/(public)/i/[guestId]/actions";
import { cn } from "@/lib/utils";

interface RsvpButtonsProps {
  guestId: string;
  projectId: string;
  currentRsvp?: "yes" | "no";
  theme?: "rose" | "gold" | "minimal";
}

export function RsvpButtons({
  guestId,
  projectId,
  currentRsvp,
  theme = "minimal",
}: RsvpButtonsProps) {
  const [loading, setLoading] = useState<"yes" | "no" | null>(null);
  const [response, setResponse] = useState<"yes" | "no" | undefined>(
    currentRsvp,
  );

  const handleRsvp = async (newResponse: "yes" | "no") => {
    if (newResponse === response || loading) return;

    setLoading(newResponse);
    try {
      const result = await submitRsvpAction(guestId, projectId, newResponse);
      if (result.success) {
        setResponse(newResponse);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to submit RSVP. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const getThemeClasses = (_isYes: boolean, isSelected: boolean) => {
    if (theme === "rose") {
      if (isSelected) {
        return "bg-[#9c6a6c] text-white border-[#9c6a6c]";
      }
      return "bg-transparent text-[#9c6a6c] border-[#9c6a6c] hover:bg-[#fdf4f6]";
    }

    if (theme === "gold") {
      if (isSelected) {
        return "bg-amber-400 text-slate-900 border-amber-400 font-medium";
      }
      return "bg-transparent text-amber-200 border-amber-400/50 hover:bg-amber-900/30";
    }

    // minimal
    if (isSelected) {
      return "bg-zinc-900 text-zinc-50 border-zinc-900";
    }
    return "bg-transparent text-zinc-700 border-zinc-300 hover:bg-zinc-100";
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm mx-auto">
      <button
        type="button"
        onClick={() => handleRsvp("yes")}
        disabled={loading !== null}
        className={cn(
          "relative w-full sm:w-auto px-8 py-3 rounded-full border transition-all duration-300 text-sm tracking-wider uppercase",
          getThemeClasses(true, response === "yes"),
          loading !== null && loading !== "yes" && "opacity-50",
        )}
      >
        <span
          className={cn(
            "flex items-center justify-center gap-2",
            loading === "yes" && "opacity-0",
          )}
        >
          Joyfully Accept
        </span>
        {loading === "yes" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={() => handleRsvp("no")}
        disabled={loading !== null}
        className={cn(
          "relative w-full sm:w-auto px-8 py-3 rounded-full border transition-all duration-300 text-sm tracking-wider uppercase",
          getThemeClasses(false, response === "no"),
          loading !== null && loading !== "no" && "opacity-50",
        )}
      >
        <span
          className={cn(
            "flex items-center justify-center gap-2",
            loading === "no" && "opacity-0",
          )}
        >
          Regretfully Decline
        </span>
        {loading === "no" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </span>
        )}
      </button>
    </div>
  );
}
