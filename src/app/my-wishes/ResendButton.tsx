"use client";

import { useState } from "react";
import { resendVerificationEmail } from "@/lib/auth/actions";
import { CheckCircle } from "lucide-react";

export function ResendButton() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    const res = await resendVerificationEmail();
    if (res?.success) setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <span className="inline-flex items-center text-sm font-medium text-sage">
        <CheckCircle className="w-4 h-4 mr-1" />
        Sent!
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleResend}
      disabled={loading}
      className="shrink-0 py-2 px-4 border border-orange-200 bg-white rounded-lg text-sm font-medium text-orange-700 hover:bg-orange-50 transition-colors disabled:opacity-50"
    >
      {loading ? "Sending..." : "Resend Email"}
    </button>
  );
}
