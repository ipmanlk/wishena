import { notFound } from "next/navigation";
import { AddGuestForm } from "@/components/invites/AddGuestForm";
import { Modal } from "@/components/ui/Modal";
import { getInviteTemplateById } from "@/lib/invite-templates";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function AddGuestModalPage({ params }: PageProps) {
  const { projectId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const project = await supabaseInviteRepository.getById(projectId);
  if (!project || project.userId !== user?.id) {
    notFound();
  }

  const template = getInviteTemplateById(project.templateId);
  if (!template) {
    notFound();
  }

  return (
    <Modal>
      <div className="p-6 sm:p-8">
        <h2 className="text-xl font-bold text-zinc-900 mb-6">Add Guest</h2>
        <AddGuestForm project={project} />
      </div>
    </Modal>
  );
}
