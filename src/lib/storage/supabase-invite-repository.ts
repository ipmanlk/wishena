import type { SupabaseClientType } from "../supabase/client-types";
import type { Json } from "../supabase/types";
import type { GuestFieldDefinition, InviteProject } from "../types";

function isGuestFieldDefinitionList(
  value: Json | null,
): value is Json & GuestFieldDefinition[] {
  if (!Array.isArray(value)) return false;
  return value.every((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return false;
    }

    return (
      typeof item.key === "string" &&
      typeof item.label === "string" &&
      (item.type === "text" || item.type === "textarea") &&
      typeof item.required === "boolean" &&
      typeof item.isPublic === "boolean" &&
      (item.placeholder === undefined || typeof item.placeholder === "string")
    );
  });
}

function isStringRecord(
  value: Json | null,
): value is Json & Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((entry) => typeof entry === "string");
}

export const supabaseInviteRepository = {
  async getCount(
    supabase: SupabaseClientType,
    userId: string,
  ): Promise<number> {
    const { count, error } = await supabase
      .from("invite_projects")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) return 0;
    return count ?? 0;
  },
  async getAll(supabase: SupabaseClientType): Promise<InviteProject[]> {
    const { data, error } = await supabase
      .from("invite_projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      userId: row.user_id,
      templateId: row.template_id,
      inviteKind: row.invite_kind,
      title: row.title,
      payload: isStringRecord(row.payload) ? row.payload : {},
      rsvpEnabled: row.rsvp_enabled,
      guestLimit: row.guest_limit,
      guestFieldDefinitions: isGuestFieldDefinitionList(
        row.guest_field_definitions,
      )
        ? row.guest_field_definitions
        : [],
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  },

  async getById(
    supabase: SupabaseClientType,
    id: string,
  ): Promise<InviteProject | null> {
    const { data, error } = await supabase
      .from("invite_projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      userId: data.user_id,
      templateId: data.template_id,
      inviteKind: data.invite_kind,
      title: data.title,
      payload: isStringRecord(data.payload) ? data.payload : {},
      rsvpEnabled: data.rsvp_enabled,
      guestLimit: data.guest_limit,
      guestFieldDefinitions: isGuestFieldDefinitionList(
        data.guest_field_definitions,
      )
        ? data.guest_field_definitions
        : [],
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  async save(
    supabase: SupabaseClientType,
    project: InviteProject,
  ): Promise<boolean> {
    const { error } = await supabase.from("invite_projects").insert({
      id: project.id,
      user_id: project.userId,
      template_id: project.templateId,
      invite_kind: project.inviteKind,
      title: project.title,
      payload: project.payload as unknown as Json,
      rsvp_enabled: project.rsvpEnabled,
      guest_limit: project.guestLimit,
      guest_field_definitions: project.guestFieldDefinitions as unknown as Json,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
    });

    if (error) {
      console.error("supabaseInviteRepository.save error:", error);
    }

    return !error;
  },

  async update(
    supabase: SupabaseClientType,
    id: string,
    updates: Partial<InviteProject>,
  ): Promise<boolean> {
    // Map camcelCase to snake_case for Supabase
    const dbUpdates: {
      updated_at: string;
      title?: string;
      payload?: Json;
      rsvp_enabled?: boolean;
      guest_limit?: number | null;
      guest_field_definitions?: Json;
    } = {
      updated_at: new Date().toISOString(),
    };

    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.payload !== undefined)
      dbUpdates.payload = updates.payload as unknown as Json;
    if (updates.rsvpEnabled !== undefined)
      dbUpdates.rsvp_enabled = updates.rsvpEnabled;
    if (updates.guestLimit !== undefined)
      dbUpdates.guest_limit = updates.guestLimit;
    if (updates.guestFieldDefinitions !== undefined)
      dbUpdates.guest_field_definitions =
        updates.guestFieldDefinitions as unknown as Json;

    const { error } = await supabase
      .from("invite_projects")
      .update(dbUpdates)
      .eq("id", id);

    if (error) {
      console.error("supabaseInviteRepository.update error:", error);
    }

    return !error;
  },

  async delete(supabase: SupabaseClientType, id: string): Promise<boolean> {
    const { error } = await supabase
      .from("invite_projects")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("supabaseInviteRepository.delete error:", error);
    }

    return !error;
  },
};
