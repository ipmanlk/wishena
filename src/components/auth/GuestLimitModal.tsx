"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { signInWithGoogle } from "@/lib/auth/actions";

interface GuestLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuestLimitModal({ isOpen, onClose }: GuestLimitModalProps) {
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
                    type="button"
                    onClick={onClose}
                    className="p-2 text-warm-gray-text hover:text-ink transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center gap-2 text-terracotta mb-4">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl text-ink font-serif font-medium mb-3">
                    You've used your 3 free wishes 🎉
                  </h3>
                  <p className="text-warm-gray-text">
                    Create a free account to keep making moments. Your existing
                    wishes will be saved automatically.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/auth/signup"
                    className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-terracotta hover:bg-terracotta/90 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Sign up with Email
                  </Link>

                  <button
                    type="button"
                    onClick={() => signInWithGoogle()}
                    className="w-full flex justify-center items-center py-3.5 px-4 border border-warm-gray/30 rounded-xl shadow-sm bg-white text-sm font-medium text-ink hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      role="img"
                      aria-label="Google"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Continue with Google
                  </button>
                </div>

                <div className="mt-6 text-center text-sm">
                  <span className="text-warm-gray-text">
                    Already have an account?{" "}
                  </span>
                  <Link
                    href="/auth/login"
                    className="text-terracotta hover:text-terracotta/80 font-medium"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
