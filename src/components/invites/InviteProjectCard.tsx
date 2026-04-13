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
    <div className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-medium uppercase tracking-wider mb-3 w-fit">
              <CalendarHeart className="w-3 h-3" />
              {project.inviteKind}
            </span>
            <h3 className="font-semibold text-lg text-zinc-900 leading-tight">
              {project.title}
            </h3>
            <p className="text-zinc-500 text-sm mt-1">
              Template: {templateName}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-100 grid gap-3 flex-grow">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <Users className="w-4 h-4 text-zinc-400" />
            <span>
              {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
            </span>
            {project.guestLimit && (
              <span className="text-zinc-400 text-xs">
                / {project.guestLimit} limit
              </span>
            )}
          </div>

          {project.rsvpEnabled && (
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <CheckCircle2 className="w-4 h-4 text-zinc-400" />
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-medium">
                  {rsvpYes} Yes
                </span>
                <span className="text-zinc-300">•</span>
                <span className="text-rose-600 font-medium">{rsvpNo} No</span>
                <span className="text-zinc-300">•</span>
                <span className="text-amber-600 font-medium">
                  {rsvpPending} Pend
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-zinc-50 px-6 py-4 flex gap-3 border-t">
        <Link
          href={`/invites/${project.id}/edit`}
          className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors flex items-center justify-center"
        >
          <Edit3 className="w-4 h-4" />
        </Link>
        <Link
          href={`/invites/${project.id}`}
          className="flex-grow px-4 py-2 bg-zinc-900 text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5"
        >
          Manage Guests
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
