import type { SupabaseClientType } from "../supabase/client-types";
import type { Json } from "../supabase/types";
import type { Wish } from "../types";

function isStringRecord(
  value: Json | null,
): value is Json & Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((entry) => typeof entry === "string");
}

export const supabaseWishRepository = {
  async getAll(supabase: SupabaseClientType): Promise<Wish[]> {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      templateId: row.template_id,
      payload: isStringRecord(row.payload) ? row.payload : {},
      createdAt: row.created_at,
      expiresAt: row.expires_at,
      userId: row.user_id,
    }));
  },

  async getById(
    supabase: SupabaseClientType,
    id: string,
  ): Promise<Wish | null> {
    // Use admin client so share links work and bypass any strict owner-only RLS policies
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      templateId: data.template_id,
      payload: isStringRecord(data.payload) ? data.payload : {},
      createdAt: data.created_at,
      expiresAt: data.expires_at,
      userId: data.user_id,
    };
  },

  async save(
    supabase: SupabaseClientType,
    wish: Wish,
    userId: string,
  ): Promise<boolean> {
    // For authenticated users, calculate 365 days expiry if not forever
    let expiresAt = wish.expiresAt;
    if (!expiresAt) {
      const d = new Date();
      d.setDate(d.getDate() + 365);
      expiresAt = d.toISOString();
    }

    const { error } = await supabase.from("wishes").insert({
      id: wish.id,
      user_id: userId,
      template_id: wish.templateId,
      payload: wish.payload as unknown as Json,
      created_at: wish.createdAt,
      expires_at: expiresAt,
    });

    return !error;
  },

  async delete(supabase: SupabaseClientType, id: string): Promise<boolean> {
    const { error } = await supabase.from("wishes").delete().eq("id", id);

    // Delete policy will restrict deleting based on user
    return !error;
  },

  async getCount(
    supabase: SupabaseClientType,
    userId: string,
  ): Promise<number> {
    const { count, error } = await supabase
      .from("wishes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) return 0;
    return count ?? 0;
  },
};
