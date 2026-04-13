import { createAdminClient, createClient } from "../supabase/server";
import type { InviteGuest } from "../types";

export const supabaseInviteGuestRepository = {
  async getByProjectId(projectId: string): Promise<InviteGuest[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("invite_guests")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      projectId: row.project_id,
      name: row.name,
      note: row.note,
      email: row.email,
      contactNumber: row.contact_number,
      extraData: row.extra_data,
      createdAt: row.created_at,
    }));
  },

  async getById(id: string): Promise<InviteGuest | null> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("invite_guests")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      projectId: data.project_id,
      name: data.name,
      note: data.note,
      email: data.email,
      contactNumber: data.contact_number,
      extraData: data.extra_data,
      createdAt: data.created_at,
    };
  },

  async save(guest: InviteGuest): Promise<boolean> {
    const supabase = await createClient();

    const { error } = await supabase.from("invite_guests").insert({
      id: guest.id,
      project_id: guest.projectId,
      name: guest.name,
      note: guest.note,
      email: guest.email,
      contact_number: guest.contactNumber,
      extra_data: guest.extraData,
      created_at: guest.createdAt,
    });

    return !error;
  },

  async update(id: string, updates: Partial<InviteGuest>): Promise<boolean> {
    const supabase = await createClient();

    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.note !== undefined) dbUpdates.note = updates.note;
    if (updates.email !== undefined) dbUpdates.email = updates.email;
    if (updates.contactNumber !== undefined)
      dbUpdates.contact_number = updates.contactNumber;
    if (updates.extraData !== undefined)
      dbUpdates.extra_data = updates.extraData;

    const { error } = await supabase
      .from("invite_guests")
      .update(dbUpdates)
      .eq("id", id);

    return !error;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("invite_guests")
      .delete()
      .eq("id", id);

    return !error;
  },

  async bulkSave(guests: InviteGuest[]): Promise<boolean> {
    const supabase = await createClient();

    const dbGuests = guests.map((guest) => ({
      id: guest.id,
      project_id: guest.projectId,
      name: guest.name,
      note: guest.note,
      email: guest.email,
      contact_number: guest.contactNumber,
      extra_data: guest.extraData,
      created_at: guest.createdAt,
    }));

    const { error } = await supabase.from("invite_guests").insert(dbGuests);

    return !error;
  },
};
