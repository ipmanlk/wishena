"use client";

import { useEffect, useState } from "react";
import NotFound from "@/components/wish/NotFound";
import ShareButtons from "@/components/wish/ShareButtons";
import WishRenderer from "@/components/wish/WishRenderer";
import { wishRepository } from "@/lib/storage/wish-repository";
import { getTemplateById } from "@/lib/templates";
import type { Template, Wish } from "@/lib/types";

export function WishClientWrapper({
  wishId,
  initialWish,
}: {
  wishId: string;
  initialWish: Wish | null;
}) {
  const [wish, setWish] = useState<Wish | null>(initialWish);
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let foundWish = initialWish;
    if (!foundWish) {
      // Fallback to local storage for backward compatibility with old links during transition
      foundWish = wishRepository.getById(wishId);
      if (foundWish) setWish(foundWish);
    }

    if (foundWish) {
      const foundTemplate = getTemplateById(foundWish.templateId);
      setTemplate(foundTemplate);
    }

    setIsLoading(false);
  }, [wishId, initialWish]);

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
