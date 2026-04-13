import { formatDistanceToNow } from "date-fns";
import type { InviteGuest, InviteRsvp } from "@/lib/types";

interface RsvpDashboardProps {
  guests: InviteGuest[];
  rsvps: InviteRsvp[];
}

export function RsvpDashboard({ guests, rsvps }: RsvpDashboardProps) {
  const rsvpMap = new Map(rsvps.map((r) => [r.guestId, r]));

  const yesCount = rsvps.filter((r) => r.response === "yes").length;
  const noCount = rsvps.filter((r) => r.response === "no").length;
  const pendingCount = guests.length - yesCount - noCount;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{guests.length}</span>
          <span className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
            Total Guests
          </span>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex flex-col items-center justify-center text-emerald-800">
          <span className="text-2xl font-semibold">{yesCount}</span>
          <span className="text-xs text-emerald-600/80 uppercase tracking-wider mt-1">
            Attending
          </span>
        </div>
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex flex-col items-center justify-center text-rose-800">
          <span className="text-2xl font-semibold">{noCount}</span>
          <span className="text-xs text-rose-600/80 uppercase tracking-wider mt-1">
            Declined
          </span>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex flex-col items-center justify-center text-amber-800">
          <span className="text-2xl font-semibold">{pendingCount}</span>
          <span className="text-xs text-amber-600/80 uppercase tracking-wider mt-1">
            Pending
          </span>
        </div>
      </div>

      {/* Guest List Detail */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 text-zinc-500 border-b">
            <tr>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                Guest Name
              </th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                Contact
              </th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                Status
              </th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px] text-right">
                Responded
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {guests.map((guest) => {
              const rsvp = rsvpMap.get(guest.id);

              return (
                <tr key={guest.id} className="hover:bg-zinc-50/50">
                  <td className="px-6 py-4 font-medium text-zinc-900">
                    {guest.name}
                  </td>
                  <td className="px-6 py-4 text-zinc-500 text-sm">
                    {guest.email && (
                      <div className="truncate max-w-[200px]">
                        {guest.email}
                      </div>
                    )}
                    {guest.contactNumber && <div>{guest.contactNumber}</div>}
                    {!guest.email && !guest.contactNumber && (
                      <span className="text-zinc-300">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {!rsvp ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-amber-100 text-amber-800">
                        Pending
                      </span>
                    ) : rsvp.response === "yes" ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-rose-100 text-rose-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-zinc-400 text-right">
                    {rsvp
                      ? formatDistanceToNow(new Date(rsvp.respondedAt), {
                          addSuffix: true,
                        })
                      : "-"}
                  </td>
                </tr>
              );
            })}

            {guests.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  No guests added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
