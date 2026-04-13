import { CustomNote } from "@/components/invite-modules/CustomNote";
import { DecorativeDivider } from "@/components/invite-modules/DecorativeDivider";
import { EventDetails } from "@/components/invite-modules/EventDetails";
import { GuestAddress } from "@/components/invite-modules/GuestAddress";
import { HonoreeNames } from "@/components/invite-modules/HonoreeNames";
import { InviteHeader } from "@/components/invite-modules/InviteHeader";
import { RsvpPrompt } from "@/components/invite-modules/RsvpPrompt";
import type { InviteModuleType } from "./types";

// biome-ignore lint/suspicious/noExplicitAny: Module components receive dynamic props from template definitions
type InviteModuleComponent = (props: any) => React.ReactNode;

export const inviteComponentMap: Record<
  InviteModuleType,
  InviteModuleComponent
> = {
  invite_header: InviteHeader,
  honoree_names: HonoreeNames,
  event_details: EventDetails,
  guest_address: GuestAddress,
  rsvp_prompt: RsvpPrompt,
  decorative_divider: DecorativeDivider,
  custom_note: CustomNote,
};
