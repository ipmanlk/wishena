"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "@/components/wish/NotFound";
import ShareButtons from "@/components/wish/ShareButtons";
import WishRenderer from "@/components/wish/WishRenderer";
import { wishRepository } from "@/lib/storage/wish-repository";
import { getTemplateById } from "@/lib/templates";
import type { Template, Wish } from "@/lib/types";

export default function WishPage() {
  const params = useParams();
  const [wish, setWish] = useState<Wish | null>(null);
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
    const foundWish = wishRepository.getById(id);

    if (foundWish) {
      setWish(foundWish);
      const foundTemplate = getTemplateById(foundWish.templateId);
      setTemplate(foundTemplate);
    }

    setIsLoading(false);
  }, [params]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!wish || !template) return <NotFound />;

  return (
    <>
      <WishRenderer template={template} payload={wish.payload} />
      <ShareButtons wishId={wish.id} />
    </>
  );
}
