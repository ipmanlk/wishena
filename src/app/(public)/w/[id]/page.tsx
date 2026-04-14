import { guestWishRepository } from "@/lib/guest/guest-wish-repository";
import { supabaseWishRepository } from "@/lib/storage/supabase-wish-repository";
import { getAdminClient } from "@/lib/supabase/server";
import { WishClientWrapper } from "./WishClientWrapper";

export default async function WishPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const adminClient = getAdminClient();

  let wishData = await supabaseWishRepository.getById(adminClient, id);

  if (!wishData) {
    wishData = await guestWishRepository.getById(id);
  }

  return <WishClientWrapper wishId={id} initialWish={wishData} />;
}
