import { filterTemplates } from "@templates/wishes";
import { TemplatesClient } from "@/app/_shared/wishes/TemplatesClient";

export default async function GuestWishCreatePage() {
  const result = filterTemplates({ page: 1, limit: 40 });

  return (
    <TemplatesClient
      initialItems={result.items}
      initialTotal={result.total}
      initialCategories={result.categories.filter((c) => c !== "All")}
      basePath="/guest/wishes/new"
    />
  );
}
