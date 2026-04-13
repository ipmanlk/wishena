import { createAdminClient, createClient } from "../supabase/server";
import type { InviteProject } from "../types";

export const supabaseInviteRepository = {
  async getAll(): Promise<InviteProject[]> {
    const supabase = await createClient();
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
      payload: row.payload,
      rsvpEnabled: row.rsvp_enabled,
      guestLimit: row.guest_limit,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  },

  async getById(id: string): Promise<InviteProject | null> {
    const supabase = createAdminClient();
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
      payload: data.payload,
      rsvpEnabled: data.rsvp_enabled,
      guestLimit: data.guest_limit,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  async save(project: InviteProject): Promise<boolean> {
    const supabase = await createClient();

    const { error } = await supabase.from("invite_projects").insert({
      id: project.id,
      user_id: project.userId,
      template_id: project.templateId,
      invite_kind: project.inviteKind,
      title: project.title,
      payload: project.payload,
      rsvp_enabled: project.rsvpEnabled,
      guest_limit: project.guestLimit,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
    });

    return !error;
  },

  async update(id: string, updates: Partial<InviteProject>): Promise<boolean> {
    const supabase = await createClient();

    // Map camcelCase to snake_case for Supabase
    const dbUpdates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.payload !== undefined) dbUpdates.payload = updates.payload;
    if (updates.rsvpEnabled !== undefined)
      dbUpdates.rsvp_enabled = updates.rsvpEnabled;
    if (updates.guestLimit !== undefined)
      dbUpdates.guest_limit = updates.guestLimit;

    const { error } = await supabase
      .from("invite_projects")
      .update(dbUpdates)
      .eq("id", id);

    return !error;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("invite_projects")
      .delete()
      .eq("id", id);

    return !error;
  },
};
