import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
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

  if (!user) {
    redirect("/auth");
  }

  const projects = await supabaseInviteRepository.getAll();
  // Filter by user because getAll gets all, but we need user-specific
  // Actually getAll needs to be filtered or we fetch all and filter in memory.
  // We'll filter in memory for now.
  const userProjects = projects.filter((p) => p.userId === user.id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
            My Invites
          </h1>
          <p className="text-zinc-500">
            Manage your event campaigns and guests
          </p>
        </div>
        <Link
          href="/invites/new"
          className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2 gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Invite
        </Link>
      </div>

      {userProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="text-center py-20 bg-zinc-50 border border-zinc-200 rounded-2xl border-dashed">
          <div className="mx-auto w-16 h-16 bg-white flex items-center justify-center rounded-full shadow-sm mb-4">
            <Plus className="w-6 h-6 text-zinc-400" />
          </div>
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">
            No invites yet
          </h2>
          <p className="text-zinc-500 max-w-sm mx-auto mb-6">
            Create your first invite project to start adding guests and sending
            out cards.
          </p>
          <Link
            href="/invites/new"
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-100 h-10 px-4 py-2"
          >
            Create your first invite
          </Link>
        </div>
      )}
    </div>
  );
}
