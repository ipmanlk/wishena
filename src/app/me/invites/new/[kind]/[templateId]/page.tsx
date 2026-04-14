import { getEventTemplateById } from "@templates/events";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetailsForm } from "@/components/invites/ProjectDetailsForm";

export default async function NewInviteProjectPage(props: {
  params: Promise<{ kind: string; templateId: string }>;
}) {
  const params = await props.params;
  const template = getEventTemplateById(params.templateId);

  if (!template || template.kind !== params.kind) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link
          href={`/me/invites/new/${params.kind}`}
          className="inline-flex items-center text-sm text-warm-gray-text hover:text-ink mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to {params.kind} designs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="col-span-2">
            <h1 className="text-3xl font-bold tracking-tight text-ink mb-2">
              Configure '{template.name}'
            </h1>
            <p className="text-warm-gray-text mb-10">
              Fill in your shared event details. These will appear exactly the
              same way on every guest's invitation.
            </p>

            <ProjectDetailsForm template={template} />
          </div>

          <div className="col-span-1 border-l border-warm-gray/20 pl-8 hidden lg:block">
            <h3 className="text-sm font-medium uppercase tracking-wider text-warm-gray-text mb-4">
              What happens next
            </h3>
            <p className="text-sm text-warm-gray-text">
              Once created, you can add individual guests. Each guest will
              receive a unique link that displays this shared event information
              along with their name and table.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
