import { getEventKinds } from "@templates/events";
import {
  Briefcase,
  CalendarHeart,
  ChevronRight,
  Music,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";

export default function NewInviteKindPage() {
  const kinds = getEventKinds();

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
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink mb-2">
            What are you celebrating?
          </h1>
          <p className="text-warm-gray-text">
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
                className="bg-white border border-warm-gray/20 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:border-warm-gray/40 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-warm-gray/10 flex items-center justify-center text-warm-gray-text group-hover:scale-105 transition-transform group-hover:text-ink group-hover:bg-warm-gray/20">
                  {details.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-ink">{details.label}</h3>
                  <p className="text-sm text-warm-gray-text">{details.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-warm-gray/40 group-hover:text-warm-gray-text" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
