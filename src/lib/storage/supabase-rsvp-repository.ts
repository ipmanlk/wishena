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

  async getCountsByProjectId(
    projectId: string,
  ): Promise<{ yes: number; no: number; unsure: number; total: number }> {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("invite_rsvps")
      .select("response")
      .eq("project_id", projectId);

    if (error || !data) {
      console.error(
        "supabaseRsvpRepository.getCountsByProjectId error:",
        error,
      );
      return { yes: 0, no: 0, unsure: 0, total: 0 };
    }

    const yes = data.filter((r) => r.response === "yes").length;
    const no = data.filter((r) => r.response === "no").length;
    const unsure = data.filter((r) => r.response === "unsure").length;

    return { yes, no, unsure, total: data.length };
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

    // Check if RSVP exists using direct query instead of this.getByGuestId
    // to avoid potential this binding issues
    const { data: existing, error: fetchError } = await supabase
      .from("invite_rsvps")
      .select("*")
      .eq("guest_id", guestId)
      .maybeSingle();

    if (fetchError) {
      console.error(
        "supabaseRsvpRepository.upsertRsvp fetch error:",
        fetchError,
      );
      return false;
    }

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

      if (error) {
        console.error("supabaseRsvpRepository.upsertRsvp update error:", error);
      }

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

      if (error) {
        console.error("supabaseRsvpRepository.upsertRsvp insert error:", error);
      }

      return !error;
    }
  },
};
