"use client";

import { formatDistanceToNow } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
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
        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
          Attending
        </span>
      );
    }
    if (statusValue === "no") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-rose-100 text-rose-800">
          Declined
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-amber-100 text-amber-800">
        Pending
      </span>
    );
  };

  const filterTabs: { key: FilterStatus; label: string; count: number }[] = [
    { key: "all", label: "All", count: totalGuests },
    ...(rsvpEnabled
      ? [
          {
            key: "yes" as FilterStatus,
            label: "Attending",
            count: rsvpCounts.yes,
          },
          {
            key: "no" as FilterStatus,
            label: "Declined",
            count: rsvpCounts.no,
          },
          {
            key: "pending" as FilterStatus,
            label: "Pending",
            count: pendingCount,
          },
        ]
      : []),
  ];

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalGuests);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {rsvpEnabled && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold">{totalGuests}</span>
            <span className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
              Total Guests
            </span>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex flex-col items-center justify-center text-emerald-800">
            <span className="text-2xl font-semibold">{rsvpCounts.yes}</span>
            <span className="text-xs text-emerald-600/80 uppercase tracking-wider mt-1">
              Attending
            </span>
          </div>
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex flex-col items-center justify-center text-rose-800">
            <span className="text-2xl font-semibold">{rsvpCounts.no}</span>
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
                  ? "bg-zinc-900 text-white"
                  : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
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
            className="w-full sm:w-64 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all text-zinc-900 disabled:opacity-50"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-zinc-500">
        {totalGuests === 0 ? (
          "No guests"
        ) : totalGuests === 1 ? (
          "1 guest"
        ) : totalPages === 1 ? (
          <>
            <span className="font-medium text-zinc-900">{totalGuests}</span>{" "}
            guests
          </>
        ) : (
          <>
            <span className="font-medium text-zinc-900">
              {from}-{to}
            </span>{" "}
            of <span className="font-medium text-zinc-900">{totalGuests}</span>{" "}
            guests
          </>
        )}
      </div>

      {/* Guest Table */}
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
              {rsvpEnabled && (
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                  Status
                </th>
              )}
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px]">
                Details
              </th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-[11px] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {guests.map((guest) => {
              const rsvp = rsvpMap.get(guest.id);
              const statusValue = rsvp ? rsvp.response : "pending";
              const inviteUrl = `/i/${guest.id}`;

              return (
                <tr key={guest.id} className="hover:bg-zinc-50/50">
                  <td className="px-6 py-4 font-medium text-zinc-900">
                    {guest.name}
                    {guest.note && (
                      <p className="text-xs text-zinc-400 font-normal mt-1 truncate max-w-xs">
                        {guest.note}
                      </p>
                    )}
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
                  {rsvpEnabled && (
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(statusValue)}
                        {rsvp && (
                          <span className="text-[10px] text-zinc-400">
                            {formatDistanceToNow(new Date(rsvp.respondedAt), {
                              addSuffix: true,
                            })}
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 text-zinc-500">
                    {Object.keys(guest.extraData).length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(guest.extraData).map(([k, v]) => (
                          <span
                            key={k}
                            className="px-1.5 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 border border-zinc-200"
                          >
                            {k}: {v}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-zinc-300">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
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
                  className="px-6 py-12 text-center text-zinc-500"
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
            className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    ? "bg-zinc-900 text-white"
                    : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
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
            className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
