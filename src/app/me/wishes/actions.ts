"use server";

import { createClient } from "@/lib/supabase/server";

export async function deleteWishAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("wishes").delete().eq("id", id);
  return !error;
}
