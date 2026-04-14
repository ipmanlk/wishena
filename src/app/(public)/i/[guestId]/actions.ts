"use server";

import { revalidatePath } from "next/cache";
import { supabaseRsvpRepository } from "@/lib/storage/supabase-rsvp-repository";
import { getAdminClient } from "@/lib/supabase/server";
import type { RsvpResponse } from "@/lib/types";

export async function submitRsvpAction(
  guestId: string,
  projectId: string,
  response: RsvpResponse,
) {
  try {
    const adminClient = getAdminClient();
    const success = await supabaseRsvpRepository.upsertRsvp(
      adminClient,
      guestId,
      projectId,
      response,
    );

    if (success) {
      // Revalidate the public card
      revalidatePath(`/i/${guestId}`);
      // Also potentially revalidate the creator's dashboard, though that happens dynamically usually
    }

    return { success };
  } catch (error) {
    console.error("Failed to submit RSVP:", error);
    return { success: false, error: "Internal error" };
  }
}
