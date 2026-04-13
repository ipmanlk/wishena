import type { InviteTemplate } from "../types";
import { gardenRomanceTemplate } from "./garden-romance";
import { goldenCeremonyTemplate } from "./golden-ceremony";
import { minimalistVowsTemplate } from "./minimalist-vows";

export const inviteTemplates: InviteTemplate[] = [
  gardenRomanceTemplate,
  goldenCeremonyTemplate,
  minimalistVowsTemplate,
];

export function getInviteTemplateById(id: string): InviteTemplate | undefined {
  return inviteTemplates.find((t) => t.id === id);
}

export function filterInviteTemplates(inviteKind: string): InviteTemplate[] {
  return inviteTemplates.filter((t) => t.inviteKind === inviteKind);
}

export function getInviteKinds(): string[] {
  const kinds = new Set(inviteTemplates.map((t) => t.inviteKind));
  return Array.from(kinds);
}
