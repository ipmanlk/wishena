import { createAdminClient } from "../supabase/server";
import type { Wish, GuestSession } from "../types";

export const guestWishRepository = {
  async getSession(sessionId: string): Promise<GuestSession | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("guest_sessions")
      .select("id, wish_count")
      .eq("id", sessionId)
      .single();

    if (error || !data) return null;
    return {
      id: data.id,
      wishCount: data.wish_count,
    };
  },

  async createSession(): Promise<GuestSession> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("guest_sessions")
      .insert({})
      .select("id, wish_count")
      .single();

    if (error || !data) throw new Error("Failed to create guest session");

    return {
      id: data.id,
      wishCount: data.wish_count,
    };
  },

  async getCount(sessionId: string): Promise<number> {
    const session = await this.getSession(sessionId);
    return session?.wishCount || 0;
  },

  async save(sessionId: string, wish: Omit<Wish, "userId">): Promise<boolean> {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("guest_sessions")
      .select("wish_count")
      .eq("id", sessionId)
      .single();

    if (error || !data) return false;
    if (data.wish_count >= 3) return false;

    // Update count
    const { error: updateError } = await supabase
      .from("guest_sessions")
      .update({ wish_count: data.wish_count + 1 })
      .eq("id", sessionId);

    if (updateError) return false;

    // Calculate expiry (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const { error: insertError } = await supabase.from("guest_wishes").insert({
      id: wish.id,
      guest_session_id: sessionId,
      template_id: wish.templateId,
      payload: wish.payload,
      created_at: wish.createdAt,
      expires_at: expiresAt.toISOString(),
    });

    if (insertError) {
      // Rollback count if failed (best effort)
      await supabase
        .from("guest_sessions")
        .update({ wish_count: data.wish_count })
        .eq("id", sessionId);
      return false;
    }

    return true;
  },

  async getAll(sessionId: string): Promise<Wish[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("guest_wishes")
      .select("*")
      .eq("guest_session_id", sessionId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      templateId: row.template_id,
      payload: row.payload,
      createdAt: row.created_at,
      expiresAt: row.expires_at,
    }));
  },

  async getById(id: string): Promise<Wish | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("guest_wishes")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      templateId: data.template_id,
      payload: data.payload,
      createdAt: data.created_at,
      expiresAt: data.expires_at,
    };
  },

  async claimWishes(sessionId: string, userId: string): Promise<void> {
    const supabase = createAdminClient();

    const wishes = await this.getAll(sessionId);
    if (wishes.length === 0) return;

    // Insert into user wishes. Use admin client so it bypasses RLS if needed, though inserts are fine.
    const inserts = wishes.map((w) => ({
      id: w.id,
      user_id: userId,
      template_id: w.templateId,
      payload: w.payload,
      created_at: w.createdAt,
      expires_at: w.expiresAt,
    }));

    const { error: insertError } = await supabase
      .from("wishes")
      .insert(inserts);

    if (!insertError) {
      // Delete guest session and its wishes (cascades)
      await supabase.from("guest_sessions").delete().eq("id", sessionId);
    }
  },
};
