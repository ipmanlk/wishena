import { supabaseWishRepository } from "@/lib/storage/supabase-wish-repository";
import { guestWishRepository } from "@/lib/guest/guest-wish-repository";
import { WishClientWrapper } from "./WishClientWrapper";

export default async function WishPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let wishData = await supabaseWishRepository.getById(id);

  if (!wishData) {
    wishData = await guestWishRepository.getById(id);
  }

  return <WishClientWrapper wishId={id} initialWish={wishData} />;
}
