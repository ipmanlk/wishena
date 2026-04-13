import { filterTemplates } from "@/lib/templates";
import { TemplatesClient } from "./TemplatesClient";

export default async function CreatePage() {
  const result = filterTemplates({ page: 1, limit: 40 });

  return (
    <TemplatesClient
      initialItems={result.items}
      initialTotal={result.total}
      initialCategories={result.categories.filter((c) => c !== "All")}
    />
  );
}
