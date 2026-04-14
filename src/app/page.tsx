"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gift, Heart, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/lib/auth/hooks";
import { templates } from "@/lib/templates";
import type { TemplateListItem } from "@/lib/types";

export default function HomePage() {
  const featuredTemplates: TemplateListItem[] = templates
    .filter((t) =>
      ["golden-anniversary", "graduation-day", "lavender-fields"].includes(
        t.id,
      ),
    )
    .sort((a, b) => {
      const order = ["golden-anniversary", "lavender-fields", "graduation-day"];
      return order.indexOf(a.id) - order.indexOf(b.id);
    });

  const { user } = useUser();

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
              A magical experience for every moment
            </h1>
            <p className="text-warm-gray-text text-lg md:text-xl max-w-xl mx-auto mb-10">
              Beautiful, personalized digital wishes and campaign-ready dynamic
              invitations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {user ? (
                <>
                  <Link
                    href="/me/wishes"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-terracotta text-white text-sm font-medium shadow-sm hover:bg-terracotta/90 transition-colors"
                  >
                    My Wishes
                  </Link>
                  <Link
                    href="/me/invites"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-warm-gray/30 text-sm font-medium text-ink hover:border-warm-gray/50 transition-colors"
                  >
                    My Invites
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-terracotta text-sm font-medium text-terracotta hover:bg-terracotta/10 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-terracotta text-white text-sm font-medium shadow-sm hover:bg-terracotta/90 transition-colors"
                  >
                    Create account
                  </Link>
                </>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-6 mx-auto">
              <div className="flex-1 bg-white p-8 rounded-2xl border border-warm-gray/20 text-left shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="text-xl font-medium text-ink mb-2">
                  ✨ Create a Wish
                </h3>
                <p className="text-warm-gray-text mb-6">
                  For birthdays, quick celebrations, and one-off magical
                  moments.
                </p>
                <Link
                  href={user ? "/me/wishes/new" : "/guest/wishes/new"}
                  className="text-terracotta font-medium group-hover:text-terracotta/80 inline-flex items-center gap-1"
                >
                  Create a wish <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex-1 bg-white p-8 rounded-2xl border border-warm-gray/20 text-left shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="text-xl font-medium text-ink mb-2">
                  💌 Send Personalised Invites
                </h3>
                <p className="text-warm-gray-text mb-6">
                  One design. Many guests. Every card individually addressed.
                </p>
                <Link
                  href="/me/invites"
                  className="text-terracotta font-medium group-hover:text-terracotta/80 inline-flex items-center gap-1"
                >
                  Start an invite project <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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
                  href={
                    user
                      ? `/me/wishes/new/${template.id}`
                      : `/guest/wishes/new/${template.id}`
                  }
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
              href={user ? "/me/wishes/new" : "/guest/wishes/new"}
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
            href={user ? "/me/wishes/new" : "/guest/wishes/new"}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-white rounded-xl font-medium shadow-sm hover:bg-terracotta/90 transition-colors"
          >
            {user ? "Create another wish" : "Start creating"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
