"use client";

import { motion } from "framer-motion";
import { Lock, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signInWithGoogle, signup } from "@/lib/auth/actions";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/me";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center gap-2 text-terracotta mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="mt-2 text-3xl font-medium tracking-tight text-ink font-serif">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-warm-gray-text">
            Sign up to save your wishes and make more moments
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-off-white py-8 px-4 shadow-sm border border-warm-gray/20 sm:rounded-2xl sm:px-10">
          <form action={handleSignup} className="space-y-6">
            <input type="hidden" name="next" value={nextPath} />
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ink"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-warm-gray-text" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 sm:text-sm border-warm-gray/30 rounded-xl focus:ring-terracotta focus:border-terracotta bg-white p-3 border"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-ink"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-warm-gray-text" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="block w-full pl-10 sm:text-sm border-warm-gray/30 rounded-xl focus:ring-terracotta focus:border-terracotta bg-white p-3 border"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-2 text-xs text-warm-gray-text">
                Your wishes will be claimed automatically when you sign up.
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-terracotta hover:bg-terracotta/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta transition-colors disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Sign up — it's free"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-warm-gray/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-off-white text-warm-gray-text">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => signInWithGoogle()}
                className="w-full flex justify-center items-center py-3 px-4 border border-warm-gray/30 rounded-xl shadow-sm bg-white text-sm font-medium text-ink hover:bg-gray-50 transition-colors"
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
                Google
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-warm-gray/10 text-sm text-center text-ink flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-terracotta" />
            <span>
              Check your email to unlock unlimited wishes after signing up!
            </span>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-warm-gray-text">
              Already have an account?{" "}
            </span>
            <Link
              href={`/auth/login${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""}`}
              className="text-terracotta hover:text-terracotta/80 font-medium"
            >
              Log in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
