import { nanoid } from "nanoid";
import { createAdminClient } from "../supabase/server";
import type { InviteRsvp, RsvpResponse } from "../types";

export const supabaseRsvpRepository = {
  async getByProjectId(projectId: string): Promise<InviteRsvp[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("invite_rsvps")
      .select("*")
      .eq("project_id", projectId)
      .order("responded_at", { ascending: false });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      guestId: row.guest_id,
      projectId: row.project_id,
      response: row.response as RsvpResponse,
      respondedAt: row.responded_at,
    }));
  },

  async getByGuestId(guestId: string): Promise<InviteRsvp | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("invite_rsvps")
      .select("*")
      .eq("guest_id", guestId)
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id,
      guestId: data.guest_id,
      projectId: data.project_id,
      response: data.response as RsvpResponse,
      respondedAt: data.responded_at,
    };
  },

  async upsertRsvp(
    guestId: string,
    projectId: string,
    response: RsvpResponse,
  ): Promise<boolean> {
    // This action is public, use admin client to bypass project ownership
    const supabase = createAdminClient();

    // Check if RSVP exists
    const existing = await this.getByGuestId(guestId);

    const now = new Date().toISOString();

    if (existing) {
      // Update
      const { error } = await supabase
        .from("invite_rsvps")
        .update({
          response,
          responded_at: now,
        })
        .eq("id", existing.id);

      return !error;
    } else {
      // Insert
      const { error } = await supabase.from("invite_rsvps").insert({
        id: nanoid(),
        guest_id: guestId,
        project_id: projectId,
        response,
        responded_at: now,
      });

      return !error;
    }
  },
};
