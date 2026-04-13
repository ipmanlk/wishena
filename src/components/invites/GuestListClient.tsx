"use client";

import { formatDistanceToNow } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Modal } from "@/components/ui/Modal";
import type { InviteGuest, InviteRsvp } from "@/lib/types";
import { GuestRowActions } from "./GuestRowActions";

type FilterStatus = "all" | "yes" | "no" | "pending";

interface GuestListClientProps {
  guests: InviteGuest[];
  rsvps: InviteRsvp[];
  rsvpEnabled: boolean;
  totalGuests: number;
  rsvpCounts: { yes: number; no: number; total: number };
  currentPage: number;
  totalPages: number;
  pageSize: number;
  initialSearch: string;
  initialStatus: FilterStatus;
}

export function GuestListClient({
  guests,
  rsvps,
  rsvpEnabled,
  totalGuests,
  rsvpCounts,
  currentPage,
  totalPages,
  pageSize,
  initialSearch,
  initialStatus,
}: GuestListClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState<FilterStatus>(initialStatus);
  const [selectedGuest, setSelectedGuest] = useState<InviteGuest | null>(null);

  const rsvpMap = new Map(rsvps.map((r) => [r.guestId, r]));
  const pendingCount = totalGuests - rsvpCounts.yes - rsvpCounts.no;

  const createQueryString = useCallback(
    (params: Record<string, string | number | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === "all") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    startTransition(() => {
      const query = createQueryString({ search: value, page: 1 });
      router.push(`${pathname}?${query}`, { scroll: false });
    });
  };

  const handleStatusChange = (newStatus: FilterStatus) => {
    setStatus(newStatus);
    startTransition(() => {
      const query = createQueryString({ status: newStatus, page: 1 });
      router.push(`${pathname}?${query}`, { scroll: false });
    });
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const query = createQueryString({ page });
      router.push(`${pathname}?${query}`, { scroll: false });
    });
  };

  const getStatusBadge = (statusValue: "yes" | "no" | "pending") => {
    if (statusValue === "yes") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-sage/20 text-sage">
          Attending
        </span>
      );
    }
    if (statusValue === "no") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-terracotta/15 text-terracotta">
          Declined
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-mustard/20 text-mustard border border-mustard/35">
        Pending
      </span>
    );
  };

  const filterTabs: { key: FilterStatus; label: string; count: number }[] = [
    { key: "all", label: "All", count: totalGuests },
    ...(rsvpEnabled
      ? ([
          { key: "yes", label: "Attending", count: rsvpCounts.yes },
          { key: "no", label: "Declined", count: rsvpCounts.no },
          { key: "pending", label: "Pending", count: pendingCount },
        ] satisfies { key: FilterStatus; label: string; count: number }[])
      : []),
  ];

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalGuests);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {rsvpEnabled && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-ink/20 flex flex-col items-center justify-center text-ink">
            <span className="text-2xl font-semibold">{totalGuests}</span>
            <span className="text-xs text-warm-gray-text uppercase tracking-wider mt-1">
              Total Guests
            </span>
          </div>
          <div className="bg-sage/10 p-4 rounded-xl border border-sage/25 flex flex-col items-center justify-center text-sage">
            <span className="text-2xl font-semibold">{rsvpCounts.yes}</span>
            <span className="text-xs text-sage uppercase tracking-wider mt-1">
              Attending
            </span>
          </div>
          <div className="bg-terracotta/10 p-4 rounded-xl border border-terracotta/25 flex flex-col items-center justify-center text-terracotta">
            <span className="text-2xl font-semibold">{rsvpCounts.no}</span>
            <span className="text-xs text-terracotta uppercase tracking-wider mt-1">
              Declined
            </span>
          </div>
          <div className="bg-mustard/20 p-4 rounded-xl border border-mustard/35 flex flex-col items-center justify-center text-mustard">
            <span className="text-2xl font-semibold">{pendingCount}</span>
            <span className="text-xs text-mustard uppercase tracking-wider mt-1">
              Pending
            </span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleStatusChange(tab.key)}
              disabled={isPending}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                status === tab.key
                  ? "bg-terracotta text-white"
                  : "bg-white border border-warm-gray/30 text-ink hover:bg-off-white"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-70">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search guests..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            disabled={isPending}
            className="w-full sm:w-64 px-4 py-2 bg-white border border-warm-gray/30 rounded-lg text-sm outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all text-ink disabled:opacity-50"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-warm-gray-text">
        {totalGuests === 0 ? (
          "No guests"
        ) : totalGuests === 1 ? (
          "1 guest"
        ) : totalPages === 1 ? (
          <>
            <span className="font-medium text-ink">{totalGuests}</span> guests
          </>
        ) : (
          <>
            <span className="font-medium text-ink">
              {from}-{to}
            </span>{" "}
            of <span className="font-medium text-ink">{totalGuests}</span>{" "}
            guests
          </>
        )}
      </div>

      {/* Guest Table */}
      <div className="bg-white rounded-xl border border-warm-gray/20 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-off-white text-warm-gray-text border-b border-warm-gray/20">
            <tr>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                Guest Name
              </th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                Contact
              </th>
              {rsvpEnabled && (
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                  Status
                </th>
              )}
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-gray/20">
            {guests.map((guest) => {
              const rsvp = rsvpMap.get(guest.id);
              const statusValue = rsvp ? rsvp.response : "pending";
              const inviteUrl = `/i/${guest.id}`;

              return (
                <tr
                  key={guest.id}
                  className="hover:bg-off-white/80 group cursor-pointer transition-colors"
                  onClick={() => setSelectedGuest(guest)}
                >
                  <td className="px-6 py-4 font-medium text-ink relative">
                    {guest.displayName}
                  </td>
                  <td className="px-6 py-4 text-warm-gray-text text-sm">
                    {guest.email && (
                      <div className="truncate max-w-[200px]">
                        {guest.email}
                      </div>
                    )}
                    {guest.contactNumber && <div>{guest.contactNumber}</div>}
                    {!guest.email && !guest.contactNumber && (
                      <span className="text-warm-gray">-</span>
                    )}
                  </td>
                  {rsvpEnabled && (
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col gap-1 items-start">
                        {getStatusBadge(statusValue)}
                      </div>
                    </td>
                  )}
                  <td
                    className="px-6 py-4 text-right"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-2">
                      <GuestRowActions guest={guest} inviteUrl={inviteUrl} />
                    </div>
                  </td>
                </tr>
              );
            })}

            {guests.length === 0 && (
              <tr>
                <td
                  colSpan={rsvpEnabled ? 5 : 4}
                  className="px-6 py-12 text-center text-warm-gray-text"
                >
                  No guests found. Try adjusting your filters or add a new
                  guest.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isPending}
            className="px-4 py-2 bg-white border border-warm-gray/30 text-ink rounded-lg text-sm font-medium hover:bg-off-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                disabled={isPending}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                  page === currentPage
                    ? "bg-terracotta text-white"
                    : "bg-white border border-warm-gray/30 text-ink hover:bg-off-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isPending}
            className="px-4 py-2 bg-white border border-warm-gray/30 text-ink rounded-lg text-sm font-medium hover:bg-off-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Guest Details Modal */}
      {selectedGuest && (
        <Modal onClose={() => setSelectedGuest(null)}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">
              Guest Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                    Name
                  </h3>
                  <p className="text-lg font-medium text-zinc-900">
                    {selectedGuest.displayName}
                  </p>
                </div>

                {(selectedGuest.email || selectedGuest.contactNumber) && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      Contact
                    </h3>
                    {selectedGuest.email && (
                      <div className="text-zinc-800">{selectedGuest.email}</div>
                    )}
                    {selectedGuest.contactNumber && (
                      <div className="text-zinc-800 pt-1">
                        {selectedGuest.contactNumber}
                      </div>
                    )}
                  </div>
                )}

                {rsvpEnabled && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      RSVP Status
                    </h3>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(
                        rsvpMap.get(selectedGuest.id)?.response || "pending",
                      )}
                      {rsvpMap.has(selectedGuest.id) && (
                        <span className="text-xs text-zinc-500">
                          {formatDistanceToNow(
                            new Date(
                              rsvpMap.get(selectedGuest.id)?.respondedAt,
                            ),
                            {
                              addSuffix: true,
                            },
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {selectedGuest.personalNote && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                      Personal Note
                    </h3>
                    <p className="text-zinc-800 italic bg-zinc-50 p-3 rounded-lg text-sm border border-zinc-100">
                      {selectedGuest.personalNote}
                    </p>
                  </div>
                )}

                {selectedGuest.internalNote && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 flex items-center gap-1.5">
                      Internal Note{" "}
                      <span className="text-[10px] bg-zinc-200 text-zinc-600 px-1.5 rounded flex items-center">
                        🔒 Private
                      </span>
                    </h3>
                    <p className="text-zinc-800 bg-amber-50 p-3 rounded-lg text-sm border border-amber-100/50">
                      {selectedGuest.internalNote}
                    </p>
                  </div>
                )}

                {selectedGuest.customFields &&
                  Object.keys(selectedGuest.customFields).length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                        Additional Details
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(selectedGuest.customFields).map(
                          ([k, field]) => (
                            <div
                              key={k}
                              className="flex flex-col gap-0.5 bg-zinc-50 p-3 rounded-lg border border-zinc-100"
                            >
                              <span className="text-[10px] uppercase font-medium text-zinc-500 flex items-center justify-between">
                                {field.label || k}
                                {field.isPublic ? (
                                  <span className="px-1.5 py-0.5 text-[8px] bg-blue-50 text-blue-600 rounded">
                                    👁 Public
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.5 text-[8px] bg-zinc-200 text-zinc-600 rounded">
                                    🔒 Private
                                  </span>
                                )}
                              </span>
                              <span className="text-sm text-zinc-900 mt-1 whitespace-pre-wrap">
                                {field.value}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedGuest(null)}
                className="px-6 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
