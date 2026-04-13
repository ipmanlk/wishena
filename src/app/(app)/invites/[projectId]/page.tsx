import { ChevronLeft, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { GuestListClient } from "@/components/invites/GuestListClient";
import { getInviteTemplateById } from "@/lib/invite-templates";
import { supabaseInviteGuestRepository } from "@/lib/storage/supabase-invite-guest-repository";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { supabaseRsvpRepository } from "@/lib/storage/supabase-rsvp-repository";
import { createClient } from "@/lib/supabase/server";
import type { InviteRsvp } from "@/lib/types";

const PAGE_SIZE = 20;

interface PageProps {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function InviteProjectDashboard({
  params,
  searchParams,
}: PageProps) {
  const { projectId } = await params;
  const query = await searchParams;

  const page = Math.max(1, parseInt(query.page || "1", 10));
  const search = query.search || "";
  const status =
    query.status === "yes" ||
    query.status === "no" ||
    query.status === "pending"
      ? query.status
      : "all";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const project = await supabaseInviteRepository.getById(projectId);
  if (!project || project.userId !== user.id) {
    notFound();
  }

  const template = getInviteTemplateById(project.templateId);
  if (!template) {
    notFound();
  }

  const { guests, total } =
    await supabaseInviteGuestRepository.getByProjectIdPaginated(project.id, {
      page,
      pageSize: PAGE_SIZE,
      search: search || undefined,
      status,
    });

  let rsvpCounts = { yes: 0, no: 0, unsure: 0, total: 0 };
  let rsvps: InviteRsvp[] = [];
  if (project.rsvpEnabled) {
    rsvpCounts = await supabaseRsvpRepository.getCountsByProjectId(project.id);
    if (guests.length > 0) {
      const guestIds = guests.map((g) => g.id);
      const allRsvps = await supabaseRsvpRepository.getByProjectId(project.id);
      rsvps = allRsvps.filter((r) => guestIds.includes(r.guestId));
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/invites"
          className="inline-flex items-center text-sm text-warm-gray-text hover:text-ink mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to My Invites
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-warm-gray/30 text-warm-gray-text text-[10px] font-medium uppercase tracking-wider">
                {project.inviteKind}
              </span>
              {project.rsvpEnabled && (
                <span className="px-2.5 py-1 rounded-full bg-sage/20 text-sage text-[10px] font-medium uppercase tracking-wider">
                  RSVP Enabled
                </span>
              )}
            </div>
            <h1 className="text-3xl font-serif font-medium tracking-tight text-ink">
              {project.title}
            </h1>
            <p className="text-warm-gray-text mt-1">{template.name}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/invites/${project.id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-warm-gray/30 text-ink rounded-xl text-sm font-medium hover:bg-off-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              Edit Settings
            </Link>
            <Link
              href={`/invites/${project.id}/guests/new`}
              className="flex items-center gap-2 px-4 py-2 bg-terracotta text-white rounded-xl text-sm font-medium hover:bg-terracotta/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Guest
            </Link>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-medium text-ink">
              Guest List
            </h2>
          </div>

          <GuestListClient
            guests={guests}
            rsvps={rsvps}
            rsvpEnabled={project.rsvpEnabled}
            totalGuests={total}
            rsvpCounts={rsvpCounts}
            currentPage={page}
            totalPages={totalPages}
            pageSize={PAGE_SIZE}
            initialSearch={search}
            initialStatus={status}
          />
        </section>
      </div>
    </div>
  );
}
