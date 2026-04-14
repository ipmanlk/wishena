"use client";

import { AlertCircle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GuestWishCreateError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Guest create wish page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl text-ink mb-2">Something went wrong</h1>
        <p className="text-warm-gray-text mb-8">
          We encountered an error while loading this page. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </button>
          <Link
            href="/guest/wishes/new"
            className="inline-flex items-center justify-center gap-2 bg-white text-ink border border-warm-gray/20 px-6 py-3 rounded-xl font-medium hover:bg-warm-gray/5 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to templates
          </Link>
        </div>
        {error.digest && (
          <p className="mt-8 text-xs text-muted font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
