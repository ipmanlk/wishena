"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function VerifySuccessPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-off-white py-12 px-4 shadow-sm border border-warm-gray/20 sm:rounded-2xl sm:px-10 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-sage/20 p-3">
              <CheckCircle className="w-12 h-12 text-sage" />
            </div>
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-ink font-serif mb-4">
            Email Verified!
          </h2>
          <p className="text-warm-gray-text mb-8">
            Thank you for confirming your email. You now have unlimited wishes
            unlocked.
          </p>
          <Link
            href="/me"
            className="inline-flex justify-center py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-terracotta hover:bg-terracotta/90 transition-colors"
          >
            Go to My Moments
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
