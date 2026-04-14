import { getEventTemplateById } from "@templates/events";
import { notFound } from "next/navigation";
import { EditGuestForm } from "@/components/invites/EditGuestForm";
import { supabaseInviteGuestRepository } from "@/lib/storage/supabase-invite-guest-repository";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { getAdminClient, getServerClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{
    projectId: string;
    guestId: string;
  }>;
}

export default async function EditGuestPage({ params }: PageProps) {
  const { projectId, guestId } = await params;

  const supabase = await getServerClient();
  const adminClient = getAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const project = await supabaseInviteRepository.getById(
    adminClient,
    projectId,
  );
  if (!project || project.userId !== user?.id) {
    notFound();
  }

  const guest = await supabaseInviteGuestRepository.getById(
    adminClient,
    guestId,
  );
  if (!guest || guest.projectId !== projectId) {
    notFound();
  }

  const template = getEventTemplateById(project.templateId);
  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Edit Guest</h1>
        <p className="text-zinc-500 mb-8">{project.title}</p>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <EditGuestForm project={project} guest={guest} />
        </div>
      </div>
    </div>
  );
}
