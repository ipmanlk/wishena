import { notFound, redirect } from "next/navigation";
import { AddGuestForm } from "@/components/invites/AddGuestForm";
import { getInviteTemplateById } from "@/lib/invite-templates";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function AddGuestPage({ params }: PageProps) {
  const { projectId } = await params;

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

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Add Guest</h1>
        <p className="text-zinc-500 mb-8">{project.title}</p>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <AddGuestForm projectId={projectId} template={template} />
        </div>
      </div>
    </div>
  );
}
