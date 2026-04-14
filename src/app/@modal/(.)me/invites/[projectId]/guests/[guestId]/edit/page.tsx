import { getEventTemplateById } from "@templates/events";
import { notFound } from "next/navigation";
import { EditGuestForm } from "@/components/invites/EditGuestForm";
import { Modal } from "@/components/ui/Modal";
import { supabaseInviteGuestRepository } from "@/lib/storage/supabase-invite-guest-repository";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { getAdminClient, getServerClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{
    projectId: string;
    guestId: string;
  }>;
}

export default async function EditGuestModalPage({ params }: PageProps) {
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
    <Modal>
      <div className="p-6 sm:p-8">
        <h2 className="text-xl font-bold text-zinc-900 mb-6">Edit Guest</h2>
        <EditGuestForm project={project} guest={guest} />
      </div>
    </Modal>
  );
}
