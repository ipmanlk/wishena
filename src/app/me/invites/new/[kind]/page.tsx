import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { filterInviteTemplates } from "@/lib/invite-templates";

interface NewInviteTemplatePageProps {
  params: Promise<{ kind: string }>;
}

export default async function NewInviteTemplatePage(
  props: NewInviteTemplatePageProps,
) {
  const params = await props.params;
  const kind = params.kind;
  const templates = filterInviteTemplates(kind);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href="/me/invites/new"
        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to event types
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
          Choose a design
        </h1>
        <p className="text-zinc-500">
          Select a template for your {kind} invite.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Link
            key={template.id}
            href={`/me/invites/new/${kind}/${template.id}`}
            className="group block h-full"
          >
            <div className="bg-white border rounded-2xl overflow-hidden hover:border-zinc-300 hover:shadow-md transition-all h-full flex flex-col">
              <div
                className="h-48 w-full p-4 relative"
                style={{
                  background: template.preview.background,
                  color: template.blueprint.globalStyle?.includes(
                    "text-zinc-300",
                  )
                    ? "#fff"
                    : "#000",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center transform scale-75">
                  {template.preview.lines.map((line, i) => (
                    <span
                      key={`${line.text}-${i}`}
                      className={line.className}
                      style={line.style}
                    >
                      {line.text}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 flex-grow border-t">
                <h3 className="font-semibold text-lg text-zinc-900">
                  {template.name}
                </h3>
                {template.description && (
                  <p className="text-sm text-zinc-500 mt-1">
                    {template.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
