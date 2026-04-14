import { ArrowRight, CalendarHeart, Heart, Wand2 } from "lucide-react";
import Link from "next/link";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { supabaseWishRepository } from "@/lib/storage/supabase-wish-repository";
import { getAdminClient, getUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function MePage() {
  const { user } = await getUser();
  const adminClient = getAdminClient();

  const wishCount = user?.id
    ? await supabaseWishRepository.getCount(adminClient, user.id)
    : 0;
  const inviteCount = user?.id
    ? await supabaseInviteRepository.getCount(adminClient, user.id)
    : 0;

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-terracotta mb-2">
              <Wand2 className="w-5 h-5" />
            </div>
            <h1 className="text-3xl md:text-4xl text-ink font-serif font-medium">
              My Moments
            </h1>
            <p className="text-warm-gray-text mt-2">
              Your wishes, invites, and share links in one place.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/me/wishes/new"
              className="inline-flex items-center justify-center py-3 px-5 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-terracotta hover:bg-terracotta/90 transition-colors"
            >
              Create wish
            </Link>
            <Link
              href="/me/invites/new"
              className="inline-flex items-center justify-center py-3 px-5 border border-warm-gray/30 rounded-xl text-sm font-medium text-ink bg-white hover:bg-off-white transition-colors"
            >
              Create invite
            </Link>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <section className="bg-off-white border border-warm-gray/20 rounded-3xl p-6 shadow-sm flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-terracotta mb-2">
                  <Heart className="w-5 h-5" />
                </div>
                <h2 className="text-2xl text-ink font-serif font-medium">
                  Wishes
                </h2>
                <p className="text-warm-gray-text mt-2">
                  Create heartfelt moments and share them instantly.
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-serif text-ink">{wishCount}</p>
                <p className="text-xs text-warm-gray-text">Total wishes</p>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between gap-4 pt-6">
              <div className="text-sm text-warm-gray-text">
                {wishCount === 0
                  ? "No wishes yet. Start with a quick template."
                  : "Manage, share, or create a new wish in seconds."}
              </div>
              <Link
                href="/me/wishes"
                className="inline-flex items-center text-sm font-medium text-terracotta hover:text-terracotta/80"
              >
                View wishes
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </section>

          <section className="bg-off-white border border-warm-gray/20 rounded-3xl p-6 shadow-sm flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-terracotta mb-2">
                  <CalendarHeart className="w-5 h-5" />
                </div>
                <h2 className="text-2xl text-ink font-serif font-medium">
                  Invites
                </h2>
                <p className="text-warm-gray-text mt-2">
                  Track events, guests, and RSVPs at a glance.
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-serif text-ink">{inviteCount}</p>
                <p className="text-xs text-warm-gray-text">Invite projects</p>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between gap-4 pt-6">
              <div className="text-sm text-warm-gray-text">
                {inviteCount === 0
                  ? "Set up your first invite project in minutes."
                  : "Jump into guest lists, settings, and RSVP tracking."}
              </div>
              <Link
                href="/me/invites"
                className="inline-flex items-center text-sm font-medium text-terracotta hover:text-terracotta/80"
              >
                View invites
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </section>
        </div>

        <section className="bg-white border border-warm-gray/20 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-serif font-medium text-ink">
                Share your latest work
              </h3>
              <p className="text-warm-gray-text mt-2">
                Invite guests or send a wish link as soon as you create it.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/me/wishes"
                className="inline-flex items-center justify-center px-4 py-2 border border-warm-gray/30 rounded-xl text-sm font-medium text-ink bg-off-white hover:bg-white transition-colors"
              >
                Manage wishes
              </Link>
              <Link
                href="/me/invites"
                className="inline-flex items-center justify-center px-4 py-2 border border-warm-gray/30 rounded-xl text-sm font-medium text-ink bg-off-white hover:bg-white transition-colors"
              >
                Manage invites
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
