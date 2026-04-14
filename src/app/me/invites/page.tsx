import { CalendarHeart, Plus } from "lucide-react";
import Link from "next/link";
import { InviteProjectCard } from "@/components/invites/InviteProjectCard";
import { getInviteTemplateById } from "@/lib/invite-templates";
import { supabaseInviteGuestRepository } from "@/lib/storage/supabase-invite-guest-repository";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { supabaseRsvpRepository } from "@/lib/storage/supabase-rsvp-repository";
import { createClient } from "@/lib/supabase/server";

export default async function InvitesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const projects = await supabaseInviteRepository.getAll();
  const userProjects = projects.filter((p) => p.userId === user?.id);

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-terracotta mb-2">
              <CalendarHeart className="w-5 h-5" />
            </div>
            <h1 className="text-3xl md:text-4xl text-ink font-serif font-medium">
              My Invites
            </h1>
          </div>
          <Link
            href="/me/invites/new"
            className="inline-flex items-center justify-center py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-terracotta hover:bg-terracotta/90 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Invite
          </Link>
        </header>

        {userProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {userProjects.map(async (project) => {
              const template = getInviteTemplateById(project.templateId);
              const guests = await supabaseInviteGuestRepository.getByProjectId(
                project.id,
              );
              let yes = 0,
                no = 0,
                pending = guests.length;

              if (project.rsvpEnabled) {
                const rsvps = await supabaseRsvpRepository.getByProjectId(
                  project.id,
                );
                yes = rsvps.filter((r) => r.response === "yes").length;
                no = rsvps.filter((r) => r.response === "no").length;
                pending = guests.length - (yes + no);
              }

              return (
                <InviteProjectCard
                  key={project.id}
                  project={project}
                  guestCount={guests.length}
                  rsvpYes={yes}
                  rsvpNo={no}
                  rsvpPending={pending}
                  templateName={template?.name || "Unknown Template"}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-off-white border border-warm-gray/20 rounded-3xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-gray/10 text-warm-gray-text mb-4">
              <CalendarHeart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-ink mb-2">
              No invites yet
            </h3>
            <p className="text-warm-gray-text mb-6">
              Create your first invite to start managing your event guests.
            </p>
            <Link
              href="/me/invites/new"
              className="inline-flex justify-center items-center py-2.5 px-5 border border-warm-gray/30 rounded-xl shadow-sm bg-white text-sm font-medium text-ink hover:bg-gray-50 transition-colors"
            >
              Get started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
