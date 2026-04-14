import {
  Briefcase,
  CalendarHeart,
  ChevronRight,
  Music,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";
import { getInviteKinds } from "@/lib/invite-templates";

export default function NewInviteKindPage() {
  const kinds = getInviteKinds();

  const getKindDetails = (kind: string) => {
    switch (kind) {
      case "wedding":
        return {
          label: "Wedding",
          icon: <CalendarHeart className="w-6 h-6" />,
          desc: "Formal designs for your special day",
        };
      case "party":
        return {
          label: "Party",
          icon: <PartyPopper className="w-6 h-6" />,
          desc: "Fun and vibrant celebration invites",
        };
      case "concert":
      case "musical":
        return {
          label: "Music & Concert",
          icon: <Music className="w-6 h-6" />,
          desc: "Audio-enabled performance invites",
        };
      case "corporate":
        return {
          label: "Corporate Event",
          icon: <Briefcase className="w-6 h-6" />,
          desc: "Professional galas and launches",
        };
      default:
        return {
          label: kind.charAt(0).toUpperCase() + kind.slice(1),
          icon: <CalendarHeart className="w-6 h-6" />,
          desc: `Create a ${kind} invite`,
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
          What are you celebrating?
        </h1>
        <p className="text-zinc-500">
          Choose the type of event to see corresponding designs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {kinds.map((kind) => {
          const details = getKindDetails(kind);
          return (
            <Link
              key={kind}
              href={`/me/invites/new/${kind}`}
              className="bg-white border rounded-2xl p-6 flex items-center gap-4 hover:border-zinc-300 hover:shadow-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:scale-105 transition-transform group-hover:text-zinc-900 group-hover:bg-zinc-200">
                {details.icon}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-zinc-900">{details.label}</h3>
                <p className="text-sm text-zinc-500">{details.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-zinc-500" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
