import { ChevronLeft, ExternalLink, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { RsvpDashboard } from "@/components/invites/RsvpDashboard";
import { getInviteTemplateById } from "@/lib/invite-templates";
import { supabaseInviteGuestRepository } from "@/lib/storage/supabase-invite-guest-repository";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { supabaseRsvpRepository } from "@/lib/storage/supabase-rsvp-repository";
import { createClient } from "@/lib/supabase/server";
import type { InviteRsvp } from "@/lib/types";

export default async function InviteProjectDashboard(props: {
  params: Promise<{ projectId: string }>;
}) {
  const params = await props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const project = await supabaseInviteRepository.getById(params.projectId);
  if (!project || project.userId !== user.id) {
    notFound();
  }

  const template = getInviteTemplateById(project.templateId);
  if (!template) {
    notFound();
  }

  const guests = await supabaseInviteGuestRepository.getByProjectId(project.id);

  let rsvps: InviteRsvp[] = [];
  if (project.rsvpEnabled) {
    rsvps = await supabaseRsvpRepository.getByProjectId(project.id);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href="/invites"
        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to My Invites
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-medium uppercase tracking-wider">
              {project.inviteKind}
            </span>
            {project.rsvpEnabled && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-medium uppercase tracking-wider">
                RSVP Enabled
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {project.title}
          </h1>
          <p className="text-zinc-500 mt-1">Template: {template.name}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/invites/${project.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Edit Settings
          </Link>
          <Link
            href={`/invites/${project.id}/guests/new`}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Guest
          </Link>
        </div>
      </div>

      <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm mb-12">
        <div className="grid grid-cols-3 divide-x divide-zinc-200">
          <div className="p-6">
            <span className="block text-sm font-medium text-zinc-500 mb-1">
              Guests
            </span>
            <span className="text-2xl font-bold">{guests.length}</span>
          </div>
          <div className="p-6">
            <span className="block text-sm font-medium text-zinc-500 mb-1">
              Link Clicks
            </span>
            <span className="text-2xl font-bold">0</span> {/* Analytics STUB */}
          </div>
          <div className="p-6">
            <span className="block text-sm font-medium text-zinc-500 mb-1">
              Status
            </span>
            <span className="text-emerald-600 font-medium">Active</span>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* RSVP Dashboard conditionally rendered */}
        {project.rsvpEnabled && (
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">
              RSVP Responses
            </h2>
            <RsvpDashboard guests={guests} rsvps={rsvps} />
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-zinc-900">Guest Links</h2>
          </div>

          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 text-zinc-500 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                    Guest Name
                  </th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                    Extra Data
                  </th>
                  <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {guests.map((guest) => {
                  const inviteUrl = `/i/${guest.id}`;
                  return (
                    <tr key={guest.id} className="hover:bg-zinc-50/50 group">
                      <td className="px-6 py-4 font-medium text-zinc-900">
                        {guest.name}
                        {guest.note && (
                          <p className="text-xs text-zinc-400 font-normal mt-1 truncate max-w-xs">
                            {guest.note}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-zinc-500">
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.entries(guest.extraData).map(([k, v]) => (
                            <span
                              key={k}
                              className="px-1.5 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 border border-zinc-200"
                            >
                              {k}: {v}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={inviteUrl}
                            target="_blank"
                            className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
                            title="Open Invite Link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {guests.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-12 text-center text-zinc-500"
                    >
                      No guests added yet. Click 'Add Guest' to generate an
                      invite link.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
