import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function TemplateNotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warm-gray/10 mb-6">
          <FileQuestion className="w-8 h-8 text-warm-gray-text" />
        </div>
        <h1 className="text-2xl text-ink mb-2">Template not found</h1>
        <p className="text-warm-gray-text mb-8">
          The template you&apos;re looking for doesn&apos;t exist or may have
          been removed.
        </p>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Back to templates
        </Link>
      </div>
    </div>
  );
}
