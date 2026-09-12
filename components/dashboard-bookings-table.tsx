"use client";

import { useState } from "react";
import { demoBookings } from "@/lib/demo-data";

export function DashboardBookingsTable() {
  const [activeFilter, setActiveFilter] = useState<"all" | "confirmed" | "pending">("all");

  const filteredBookings = demoBookings.filter((b) => {
    if (activeFilter === "all") return true;
    return b.status === activeFilter;
  });

  const confirmedCount = demoBookings.filter((b) => b.status === "confirmed").length;
  const pendingCount = demoBookings.filter((b) => b.status === "pending").length;

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-stone-150 pb-3">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
              activeFilter === "all"
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            All ({demoBookings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("confirmed")}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
              activeFilter === "confirmed"
                ? "bg-emerald-700 text-white"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            Confirmed ({confirmedCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("pending")}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
              activeFilter === "pending"
                ? "bg-amber-600 text-white"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            Pending ({pendingCount})
          </button>
        </div>
        <span className="text-[11px] text-stone-500 font-medium">Real-time sync</span>
      </div>

      {/* Bookings List */}
      <div className="divide-y divide-stone-100">
        {filteredBookings.map((booking) => {
          const isConfirmed = booking.status === "confirmed";
          const initials = booking.customer
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <div
              key={booking.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 hover:bg-stone-50/60 transition-colors rounded-lg px-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-150 text-xs font-bold text-stone-700 uppercase">
                  {initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-stone-900">{booking.customer}</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        isConfirmed
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                          : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {booking.service} • <span className="text-stone-700 font-medium">${booking.price}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
                <div>
                  <p className="text-xs font-semibold text-stone-900">{booking.date}</p>
                  <p className="text-[11px] text-stone-500">{booking.time}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-stone-400">|</span>
                  <a
                    href={`mailto:${booking.email}`}
                    className="rounded-md border border-stone-200 bg-white px-2 py-1 text-[11px] font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 shadow-xs"
                    title={`Email ${booking.customer}`}
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
