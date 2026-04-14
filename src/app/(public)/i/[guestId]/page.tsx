import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InviteCardRenderer } from "@/components/invite/InviteCardRenderer";
import { getInviteTemplateById } from "@/lib/invite-templates";
import { supabaseInviteGuestRepository } from "@/lib/storage/supabase-invite-guest-repository";
import { supabaseInviteRepository } from "@/lib/storage/supabase-invite-repository";
import { supabaseRsvpRepository } from "@/lib/storage/supabase-rsvp-repository";
import { getAdminClient, getServerClient } from "@/lib/supabase/server";
import type { InviteRsvp } from "@/lib/types";

interface InvitePageProps {
  params: Promise<{ guestId: string }>;
}

export async function generateMetadata(
  props: InvitePageProps,
): Promise<Metadata> {
  const params = await props.params;
  const supabase = await getServerClient();
  const guest = await supabaseInviteGuestRepository.getPublicById(
    supabase,
    params.guestId,
  );
  if (!guest) return {};

  const adminClient = getAdminClient();
  const project = await supabaseInviteRepository.getById(
    adminClient,
    guest.projectId,
  );
  if (!project) return {};

  let titleStr = "You're invited!";
  if (project.payload.coupleNames) {
    titleStr = `You're invited to ${project.payload.coupleNames}'s Wedding`;
  } else if (project.payload.honoreeName) {
    titleStr = `You're invited by ${project.payload.honoreeName}`;
  }

  return {
    title: titleStr,
    description: "Click to open your personalized invitation.",
  };
}

export default async function InvitePage(props: InvitePageProps) {
  const params = await props.params;
  const supabase = await getServerClient();

  const guest = await supabaseInviteGuestRepository.getPublicById(
    supabase,
    params.guestId,
  );
  if (!guest) notFound();

  const adminClient = getAdminClient();
  const project = await supabaseInviteRepository.getById(
    adminClient,
    guest.projectId,
  );
  if (!project) notFound();

  const template = getInviteTemplateById(project.templateId);
  if (!template) notFound();

  let currentRsvp: InviteRsvp | undefined;
  if (project.rsvpEnabled) {
    const rsvpOpt = await supabaseRsvpRepository.getByGuestId(
      adminClient,
      guest.id,
    );
    if (rsvpOpt) {
      currentRsvp = rsvpOpt;
    }
  }

  return (
    <InviteCardRenderer
      template={template}
      project={project}
      guest={guest}
      currentRsvp={currentRsvp}
    />
  );
}
