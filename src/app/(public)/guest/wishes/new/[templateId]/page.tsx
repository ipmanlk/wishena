import { notFound } from "next/navigation";
import { TemplateForm } from "@/components/create/TemplateForm";
import { getTemplateById } from "@/lib/templates";

interface PageProps {
  params: Promise<{
    templateId: string;
  }>;
}

export default async function GuestWishCreateWithTemplatePage({
  params,
}: PageProps) {
  const { templateId } = await params;
  const template = getTemplateById(templateId);

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream">
      <TemplateForm template={template} backHref="/guest/wishes/new" />
    </div>
  );
}
