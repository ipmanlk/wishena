import { AlertCircle, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { supabaseWishRepository } from "@/lib/storage/supabase-wish-repository";
import { createClient } from "@/lib/supabase/server";
import { getTemplateById } from "@/lib/templates";
import { ResendButton } from "./ResendButton";
import { WishCard } from "./WishCard";

export const dynamic = "force-dynamic";

export default async function MyWishesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const wishes = await supabaseWishRepository.getAll();
  const isUnverified = !user!.email_confirmed_at;

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-terracotta mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-3xl md:text-4xl text-ink font-serif font-medium">
              My Wishes
            </h1>
          </div>
          <Link
            href="/create"
            className="inline-flex items-center justify-center py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-terracotta hover:bg-terracotta/90 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create new wish
          </Link>
        </header>

        {isUnverified && (
          <div className="mb-8 p-4 rounded-xl bg-orange-50 border border-orange-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
              <p className="text-sm text-ink">
                <strong>Please verify your email.</strong> Unverified accounts
                can only create up to 5 wishes ({wishes.length}/5 used).
              </p>
            </div>
            <ResendButton />
          </div>
        )}

        {wishes.length === 0 ? (
          <div className="text-center py-20 bg-off-white border border-warm-gray/20 rounded-3xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-gray/10 text-warm-gray-text mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-ink mb-2">No wishes yet</h3>
            <p className="text-warm-gray-text mb-6">
              Create your first wish to start making moments.
            </p>
            <Link
              href="/create"
              className="inline-flex justify-center items-center py-2.5 px-5 border border-warm-gray/30 rounded-xl shadow-sm bg-white text-sm font-medium text-ink hover:bg-gray-50 transition-colors"
            >
              Get started
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {wishes.map((wish) => {
              const template = getTemplateById(wish.templateId);
              return (
                <WishCard
                  key={wish.id}
                  wishId={wish.id}
                  templateName={template?.name || "Unknown"}
                  createdAt={wish.createdAt}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
