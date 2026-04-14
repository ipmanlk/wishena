import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetailsForm } from "@/components/invites/ProjectDetailsForm";
import { getInviteTemplateById } from "@/lib/invite-templates";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function EditProjectPage({ params }: PageProps) {
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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href={`/me/invites/${project.id}`}
        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Guest List
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="col-span-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
            Edit '{template.name}'
          </h1>
          <p className="text-zinc-500 mb-10">
            Update your event details and settings. Changes will appear on all
            guest invitations.
          </p>

          <ProjectDetailsForm
            template={template}
            initialData={{
              id: project.id,
              title: project.title,
              payload: project.payload,
              rsvpEnabled: project.rsvpEnabled,
              guestFieldDefinitions: project.guestFieldDefinitions || [],
            }}
          />
        </div>

        <div className="col-span-1 border-l pl-8 hidden lg:block">
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-400 mb-4">
            What happens next
          </h3>
          <p className="text-sm text-zinc-500">
            Any changes you make here will instantly update on every guest's
            invitation. You can return to your guest list to add more people,
            copy invite links, or track RSVPs at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
