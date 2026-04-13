import {
  CalendarHeart,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { InviteProject } from "@/lib/types";

interface InviteProjectCardProps {
  project: InviteProject;
  guestCount: number;
  rsvpYes: number;
  rsvpNo: number;
  rsvpPending: number;
  templateName: string;
}

export function InviteProjectCard({
  project,
  guestCount,
  rsvpYes,
  rsvpNo,
  rsvpPending,
  templateName,
}: InviteProjectCardProps) {
  return (
    <div className="bg-white border border-warm-gray/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warm-gray/30 text-warm-gray-text text-[10px] font-medium uppercase tracking-wider mb-3 w-fit">
              <CalendarHeart className="w-3 h-3" />
              {project.inviteKind}
            </span>
            <h3 className="font-serif font-medium text-xl text-ink leading-tight">
              {project.title}
            </h3>
            <p className="text-warm-gray-text text-sm mt-1">{templateName}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-warm-gray/20 grid gap-3 flex-grow">
          <div className="flex items-center gap-2 text-sm text-ink">
            <Users className="w-4 h-4 text-warm-gray-text" />
            <span>
              {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
            </span>
            {project.guestLimit && (
              <span className="text-muted text-xs">
                / {project.guestLimit} limit
              </span>
            )}
          </div>

          {project.rsvpEnabled && (
            <div className="flex items-start gap-2 text-sm text-ink">
              <CheckCircle2 className="w-4 h-4 text-warm-gray-text shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <span className="text-sage font-medium">
                  {rsvpYes} attending
                </span>
                <span className="text-terracotta font-medium">
                  {rsvpNo} declined
                </span>
                <span className="text-mustard font-medium">
                  {rsvpPending} pending
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-off-white px-6 py-4 flex gap-3 border-t border-warm-gray/20">
        <Link
          href={`/invites/${project.id}/edit`}
          className="px-4 py-2 bg-white border border-warm-gray/30 text-ink rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
        >
          <Edit3 className="w-4 h-4" />
        </Link>
        <Link
          href={`/invites/${project.id}`}
          className="flex-grow px-4 py-2 bg-terracotta text-white rounded-xl text-sm font-medium hover:bg-terracotta/90 transition-colors flex items-center justify-center gap-1.5"
        >
          Manage Guests
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
