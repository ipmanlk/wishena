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
      displayName: row.display_name,
      personalNote: row.personal_note,
      internalNote: row.internal_note,
      email: row.email,
      contactNumber: row.contact_number,
      customFields: row.custom_fields,
      createdAt: row.created_at,
    }));
  },

  async getByProjectIdPaginated(
    projectId: string,
    options: {
      page: number;
      pageSize: number;
      search?: string;
      status?: "all" | "yes" | "no" | "pending";
    },
  ): Promise<{ guests: InviteGuest[]; total: number }> {
    const supabase = createAdminClient();
    const { page, pageSize, search, status } = options;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let guestIds: string[] | undefined;

    // If status filter is applied, first get matching guest IDs from RSVPs
    if (status && status !== "all") {
      if (status === "pending") {
        const { data: rsvpData, error: rsvpError } = await supabase
          .from("invite_rsvps")
          .select("guest_id")
          .eq("project_id", projectId);

        if (rsvpError) {
          console.error(
            "supabaseInviteGuestRepository.getByProjectIdPaginated rsvp error:",
            rsvpError,
          );
          return { guests: [], total: 0 };
        }

        const respondedGuestIds = rsvpData?.map((r) => r.guest_id) ?? [];

        // Build base query for count and data
        let query = supabase
          .from("invite_guests")
          .select("*", { count: "exact" })
          .eq("project_id", projectId);

        if (respondedGuestIds.length > 0) {
          query = query.not("id", "in", `(${respondedGuestIds.join(",")})`);
        }

        if (search?.trim()) {
          const term = `%${search.trim()}%`;
          query = query.or(
            `display_name.ilike.${term},email.ilike.${term},personal_note.ilike.${term},internal_note.ilike.${term}`,
          );
        }

        const { data, error, count } = await query
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error || !data) {
          console.error(
            "supabaseInviteGuestRepository.getByProjectIdPaginated error:",
            error,
          );
          return { guests: [], total: count ?? 0 };
        }

        return {
          guests: data.map((row) => ({
            id: row.id,
            projectId: row.project_id,
            displayName: row.display_name,
            personalNote: row.personal_note,
            internalNote: row.internal_note,
            email: row.email,
            contactNumber: row.contact_number,
            customFields: row.custom_fields,
            createdAt: row.created_at,
          })),
          total: count ?? 0,
        };
      } else {
        // yes or no
        const { data: rsvpData, error: rsvpError } = await supabase
          .from("invite_rsvps")
          .select("guest_id")
          .eq("project_id", projectId)
          .eq("response", status);

        if (rsvpError) {
          console.error(
            "supabaseInviteGuestRepository.getByProjectIdPaginated rsvp error:",
            rsvpError,
          );
          return { guests: [], total: 0 };
        }

        guestIds = rsvpData?.map((r) => r.guest_id) ?? [];

        if (guestIds.length === 0) {
          return { guests: [], total: 0 };
        }
      }
    }

    let query = supabase
      .from("invite_guests")
      .select("*", { count: "exact" })
      .eq("project_id", projectId);

    if (guestIds && guestIds.length > 0) {
      query = query.in("id", guestIds);
    }

    if (search?.trim()) {
      const term = `%${search.trim()}%`;
      query = query.or(
        `display_name.ilike.${term},email.ilike.${term},personal_note.ilike.${term},internal_note.ilike.${term}`,
      );
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error || !data) {
      console.error(
        "supabaseInviteGuestRepository.getByProjectIdPaginated error:",
        error,
      );
      return { guests: [], total: count ?? 0 };
    }

    return {
      guests: data.map((row) => ({
        id: row.id,
        projectId: row.project_id,
        displayName: row.display_name,
        personalNote: row.personal_note,
        internalNote: row.internal_note,
        email: row.email,
        contactNumber: row.contact_number,
        customFields: row.custom_fields,
        createdAt: row.created_at,
      })),
      total: count ?? 0,
    };
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
      displayName: data.display_name,
      personalNote: data.personal_note,
      internalNote: data.internal_note,
      email: data.email,
      contactNumber: data.contact_number,
      customFields: data.custom_fields,
      createdAt: data.created_at,
    };
  },

  async save(guest: InviteGuest): Promise<boolean> {
    const supabase = await createClient();

    const { error } = await supabase.from("invite_guests").insert({
      id: guest.id,
      project_id: guest.projectId,
      display_name: guest.displayName,
      personal_note: guest.personalNote,
      internal_note: guest.internalNote,
      email: guest.email,
      contact_number: guest.contactNumber,
      custom_fields: guest.customFields,
      created_at: guest.createdAt,
    });

    if (error) {
      console.error("supabaseInviteGuestRepository.save error:", error);
    }

    return !error;
  },

  async update(id: string, updates: Partial<InviteGuest>): Promise<boolean> {
    const supabase = await createClient();

    const dbUpdates: Record<string, unknown> = {};
    if (updates.displayName !== undefined) dbUpdates.display_name = updates.displayName;
    if (updates.personalNote !== undefined) dbUpdates.personal_note = updates.personalNote;
    if (updates.internalNote !== undefined) dbUpdates.internal_note = updates.internalNote;
    if (updates.email !== undefined) dbUpdates.email = updates.email;
    if (updates.contactNumber !== undefined)
      dbUpdates.contact_number = updates.contactNumber;
    if (updates.customFields !== undefined)
      dbUpdates.custom_fields = updates.customFields;

    const { error } = await supabase
      .from("invite_guests")
      .update(dbUpdates)
      .eq("id", id);

    if (error) {
      console.error("supabaseInviteGuestRepository.update error:", error);
    }

    return !error;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("invite_guests")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("supabaseInviteGuestRepository.delete error:", error);
    }

    return !error;
  },

  async bulkSave(guests: InviteGuest[]): Promise<boolean> {
    const supabase = await createClient();

    const dbGuests = guests.map((guest) => ({
      id: guest.id,
      project_id: guest.projectId,
      display_name: guest.displayName,
      personal_note: guest.personalNote,
      internal_note: guest.internalNote,
      email: guest.email,
      contact_number: guest.contactNumber,
      custom_fields: guest.customFields,
      created_at: guest.createdAt,
    }));

    const { error } = await supabase.from("invite_guests").insert(dbGuests);

    if (error) {
      console.error("supabaseInviteGuestRepository.bulkSave error:", error);
    }

    return !error;
  },
};
