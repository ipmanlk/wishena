"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gift, Heart, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { templates } from "@/lib/templates";
import { useUser } from "@/lib/auth/hooks";
import type { TemplateListItem } from "@/lib/types";

export default function HomePage() {
  const featuredTemplates: TemplateListItem[] = templates.slice(0, 3);
  const { user, loading } = useUser();

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-24 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-terracotta mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Make every moment memorable</span>
            </div>
            <h1 className="text-5xl md:text-6xl text-ink mb-6 leading-tight">
              Create wishes that feel like magic
            </h1>
            <p className="text-warm-gray-text text-lg md:text-xl max-w-xl mx-auto mb-10">
              Beautiful, personalized digital wishes for birthdays,
              celebrations, and every moment worth sharing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-white rounded-xl font-medium shadow-sm hover:bg-terracotta/90 transition-colors"
              >
                Create a wish
                <ArrowRight className="w-4 h-4" />
              </Link>
              {!loading && !user && (
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-ink border border-warm-gray/20 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Sign up free
                </Link>
              )}
              {!loading && user && (
                <Link
                  href="/my-wishes"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-ink border border-warm-gray/20 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  My wishes
                </Link>
              )}
            </div>
          </motion.div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-24 left-[10%] w-16 h-16 rounded-full bg-terracotta/10 blur-xl" />
        <div className="absolute bottom-16 right-[15%] w-24 h-24 rounded-full bg-sage/20 blur-xl" />
        <div className="absolute top-40 right-[20%] w-12 h-12 rounded-full bg-mustard/20 blur-lg" />
      </section>

      {/* Featured Templates Section */}
      <section className="px-6 py-20 bg-off-white border-y border-warm-gray/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-ink mb-4">
              Choose a style
            </h2>
            <p className="text-warm-gray-text text-lg max-w-md mx-auto">
              From neon nights to golden hour glow — find the perfect vibe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/create/${template.id}`}
                  className="group block text-left bg-cream rounded-2xl border border-warm-gray/20 p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div
                    className="h-28 rounded-xl mb-4 overflow-hidden relative"
                    style={{ background: template.preview.background }}
                  >
                    <div className="h-full flex flex-col items-center justify-center gap-1">
                      {template.preview.lines.map((line) => (
                        <span
                          key={line.text}
                          className={line.className}
                          style={line.style}
                        >
                          {line.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg text-ink font-medium mb-1">
                    {template.name}
                  </h3>
                  <p className="text-warm-gray-text text-sm">
                    {template.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 text-terracotta font-medium hover:underline"
            >
              Browse all templates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-ink mb-4">
              Everything you need
            </h2>
            <p className="text-warm-gray-text text-lg max-w-md mx-auto">
              Simple tools to create something truly special
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-terracotta/10 text-terracotta mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-ink font-medium mb-2">
                Beautiful templates
              </h3>
              <p className="text-warm-gray-text">
                Curated designs with animations, particles, and custom fonts.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sage/10 text-sage mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-ink font-medium mb-2">
                Instant sharing
              </h3>
              <p className="text-warm-gray-text">
                Get a unique link to share via text, email, or social media.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-mustard/10 text-mustard mb-4">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-ink font-medium mb-2">
                Free to start
              </h3>
              <p className="text-warm-gray-text">
                Create and share wishes without any upfront cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-ink text-cream">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-terracotta mb-4">
            <Heart className="w-5 h-5" />
            <span className="font-medium">Ready to make someone smile?</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-6">
            Create your first wish in seconds
          </h2>
          <p className="text-warm-gray-text text-lg max-w-md mx-auto mb-10">
            No design skills needed. Just pick a template, add your message, and
            share the magic.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-white rounded-xl font-medium shadow-sm hover:bg-terracotta/90 transition-colors"
          >
            {!loading && user ? "Create another wish" : "Start creating"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
