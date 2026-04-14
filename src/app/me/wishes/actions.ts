"use server";

import { getServerClient } from "@/lib/supabase/server";

export async function deleteWishAction(id: string) {
  const supabase = await getServerClient();
  const { error } = await supabase.from("wishes").delete().eq("id", id);
  return !error;
}
