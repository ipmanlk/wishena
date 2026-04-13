"use server";

import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { supabaseInviteGuestRepository } from "@/lib/storage/supabase-invite-guest-repository";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { createClient } from "@/lib/supabase/server";

export async function createInviteProjectAction(
  templateId: string,
  inviteKind: string,
  payload: Record<string, string>,
  title: string,
  rsvpEnabled: boolean,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const id = nanoid();
  const success = await supabaseInviteRepository.save({
    id,
    userId: user.id,
    templateId,
    inviteKind,
    title,
    payload,
    rsvpEnabled,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  if (success) {
    revalidatePath("/invites");
  }

  return { id, success };
}

export async function updateInviteProjectAction(
  projectId: string,
  payload: Record<string, string>,
  title: string,
  rsvpEnabled: boolean,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Verify ownership
  const project = await supabaseInviteRepository.getById(projectId);
  if (!project || project.userId !== user.id) {
    throw new Error("Unauthorized or not found");
  }

  const success = await supabaseInviteRepository.update(projectId, {
    payload,
    title,
    rsvpEnabled,
  });

  if (success) {
    revalidatePath("/invites");
    revalidatePath(`/invites/${projectId}`);
  }

  return { success };
}

export async function deleteInviteProjectAction(projectId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const project = await supabaseInviteRepository.getById(projectId);
  if (!project || project.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const success = await supabaseInviteRepository.delete(projectId);

  if (success) {
    revalidatePath("/invites");
  }

  return { success };
}

export async function addGuestAction(
  projectId: string,
  name: string,
  note: string | undefined,
  email: string | undefined,
  contactNumber: string | undefined,
  extraData: Record<string, string>,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const project = await supabaseInviteRepository.getById(projectId);
  if (!project || project.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const id = nanoid();
  const success = await supabaseInviteGuestRepository.save({
    id,
    projectId,
    name,
    note,
    email,
    contactNumber,
    extraData,
    createdAt: new Date().toISOString(),
  });

  if (success) {
    revalidatePath(`/invites/${projectId}`);
  }

  return { id, success };
}

export async function updateGuestAction(
  guestId: string,
  projectId: string,
  name: string,
  note: string | undefined,
  email: string | undefined,
  contactNumber: string | undefined,
  extraData: Record<string, string>,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const project = await supabaseInviteRepository.getById(projectId);
  if (!project || project.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const success = await supabaseInviteGuestRepository.update(guestId, {
    name,
    note,
    email,
    contactNumber,
    extraData,
  });

  if (success) {
    revalidatePath(`/invites/${projectId}`);
    revalidatePath(`/i/${guestId}`);
  }

  return { success };
}

export async function deleteGuestAction(guestId: string, projectId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const project = await supabaseInviteRepository.getById(projectId);
  if (!project || project.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const success = await supabaseInviteGuestRepository.delete(guestId);

  if (success) {
    revalidatePath(`/invites/${projectId}`);
  }

  return { success };
}
