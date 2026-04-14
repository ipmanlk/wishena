"use server";

import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { supabaseInviteGuestRepository } from "@/lib/storage/supabase-invite-guest-repository";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { getAdminClient, getUser } from "@/lib/supabase/server";
import type { GuestCustomField, GuestFieldDefinition } from "@/lib/types";

export async function createInviteProjectAction(
  templateId: string,
  inviteKind: string,
  payload: Record<string, string>,
  title: string,
  rsvpEnabled: boolean,
  guestFieldDefinitions: GuestFieldDefinition[],
) {
  const { supabase, user } = await getUser();
  if (!user) throw new Error("Unauthorized");

  const id = nanoid();
  const success = await supabaseInviteRepository.save(supabase, {
    id,
    userId: user.id,
    templateId,
    inviteKind,
    title,
    payload,
    rsvpEnabled,
    guestFieldDefinitions,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  if (success) {
    revalidatePath("/me/invites");
  }

  return { id, success };
}

export async function updateInviteProjectAction(
  projectId: string,
  payload: Record<string, string>,
  title: string,
  rsvpEnabled: boolean,
  guestFieldDefinitions: GuestFieldDefinition[],
) {
  const { supabase, user } = await getUser();
  if (!user) throw new Error("Unauthorized");

  const adminClient = getAdminClient();
  const project = await supabaseInviteRepository.getById(
    adminClient,
    projectId,
  );
  if (!project || project.userId !== user.id) {
    throw new Error("Unauthorized or not found");
  }

  const success = await supabaseInviteRepository.update(supabase, projectId, {
    payload,
    title,
    rsvpEnabled,
    guestFieldDefinitions,
  });

  if (success) {
    revalidatePath("/me/invites");
    revalidatePath(`/me/invites/${projectId}`);
  }

  return { success };
}

export async function deleteInviteProjectAction(projectId: string) {
  const { supabase, user } = await getUser();
  if (!user) throw new Error("Unauthorized");

  const adminClient = getAdminClient();
  const project = await supabaseInviteRepository.getById(
    adminClient,
    projectId,
  );
  if (!project || project.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const success = await supabaseInviteRepository.delete(supabase, projectId);

  if (success) {
    revalidatePath("/me/invites");
  }

  return { success };
}

export async function addGuestAction(
  projectId: string,
  displayName: string,
  personalNote: string | undefined,
  internalNote: string | undefined,
  email: string | undefined,
  contactNumber: string | undefined,
  customFields: Record<string, GuestCustomField>,
) {
  const { supabase, user } = await getUser();
  if (!user) throw new Error("Unauthorized");

  const adminClient = getAdminClient();
  const project = await supabaseInviteRepository.getById(
    adminClient,
    projectId,
  );
  if (!project || project.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const id = nanoid();
  const success = await supabaseInviteGuestRepository.save(supabase, {
    id,
    projectId,
    displayName,
    personalNote,
    internalNote,
    email,
    contactNumber,
    customFields,
    createdAt: new Date().toISOString(),
  });

  if (success) {
    revalidatePath(`/me/invites/${projectId}`);
  }

  return { id, success };
}

export async function updateGuestAction(
  guestId: string,
  projectId: string,
  displayName: string,
  personalNote: string | undefined,
  internalNote: string | undefined,
  email: string | undefined,
  contactNumber: string | undefined,
  customFields: Record<string, GuestCustomField>,
) {
  const { supabase, user } = await getUser();
  if (!user) throw new Error("Unauthorized");

  const adminClient = getAdminClient();
  const project = await supabaseInviteRepository.getById(
    adminClient,
    projectId,
  );
  if (!project || project.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const success = await supabaseInviteGuestRepository.update(
    supabase,
    guestId,
    {
      displayName,
      personalNote,
      internalNote,
      email,
      contactNumber,
      customFields,
    },
  );

  if (success) {
    revalidatePath(`/me/invites/${projectId}`);
    revalidatePath(`/i/${guestId}`);
  }

  return { success };
}

export async function deleteGuestAction(guestId: string, projectId: string) {
  const { supabase, user } = await getUser();
  if (!user) throw new Error("Unauthorized");

  const adminClient = getAdminClient();
  const project = await supabaseInviteRepository.getById(
    adminClient,
    projectId,
  );
  if (!project || project.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const success = await supabaseInviteGuestRepository.delete(supabase, guestId);

  if (success) {
    revalidatePath(`/me/invites/${projectId}`);
  }

  return { success };
}
