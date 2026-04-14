import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetailsForm } from "@/components/invites/ProjectDetailsForm";
import { getInviteTemplateById } from "@/lib/invite-templates";

export default async function NewInviteProjectPage(props: {
  params: Promise<{ kind: string; templateId: string }>;
}) {
  const params = await props.params;
  const template = getInviteTemplateById(params.templateId);

  if (!template || template.inviteKind !== params.kind) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href={`/me/invites/new/${params.kind}`}
        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to {params.kind} designs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="col-span-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
            Configure '{template.name}'
          </h1>
          <p className="text-zinc-500 mb-10">
            Fill in your shared event details. These will appear exactly the
            same way on every guest's invitation.
          </p>

          <ProjectDetailsForm template={template} />
        </div>

        <div className="col-span-1 border-l pl-8 hidden lg:block">
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-400 mb-4">
            What happens next
          </h3>
          <p className="text-sm text-zinc-500">
            Once created, you can add individual guests. Each guest will receive
            a unique link that displays this shared event information along with
            their name and table.
          </p>
        </div>
      </div>
    </div>
  );
}
