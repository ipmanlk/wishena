"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, CheckCircle } from "lucide-react";
import { resendVerificationEmail } from "@/lib/auth/actions";
import { useState } from "react";

interface VerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VerifyEmailModal({ isOpen, onClose }: VerifyEmailModalProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    const res = await resendVerificationEmail();
    if (res?.success) setSent(true);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-off-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden pointer-events-auto border border-warm-gray/20">
              <div className="p-6 md:p-8">
                <div className="flex justify-end -mt-2 -mr-2">
                  <button
                    onClick={onClose}
                    className="p-2 text-warm-gray-text hover:text-ink transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center gap-2 text-terracotta mb-4">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl text-ink font-serif font-medium mb-3">
                    Verify to unlock unlimited wishes
                  </h3>
                  <p className="text-warm-gray-text">
                    You've reached the 5-wish limit for unverified accounts.
                    Check your email and verify your address to continue
                    creating.
                  </p>
                </div>

                {sent ? (
                  <div className="p-4 rounded-xl bg-sage/10 text-sage flex items-center justify-center gap-2 font-medium">
                    <CheckCircle className="w-5 h-5" />
                    Verification link sent!
                  </div>
                ) : (
                  <button
                    onClick={handleResend}
                    disabled={loading}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-terracotta hover:bg-terracotta/90 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Resend Verification Email"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
