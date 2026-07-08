"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

interface Booking {
    id: number;
    customerName: string;
    customerEmail: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
    room: {
        nameKey: string;
        slug: string;
    };
}

export default function AdminBookingsTable() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/admin/bookings");
            const data = await res.json();
            if (res.ok) setBookings(data);
        } catch (err) {
            console.error("Failed to fetch bookings", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // 2. Αλλαγή Status (CONFIRMED / CANCELLED)
    const handleStatusChange = async (bookingId: number, newStatus: string) => {
        try {
            const res = await fetch("/api/admin/bookings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId, status: newStatus }),
            });

            if (res.ok) {
                setBookings((prev) =>
                    prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus as any } : b))
                );
            }
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    if (loading) {
        return <div className="text-xs tracking-widest uppercase text-aegean-sky p-8">Loading Ledger...</div>;
    }

    return (
        <div className="border border-aegean-mist bg-white overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="border-b border-aegean-mist bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest text-aegean-sky">
                        <th className="p-4">ID</th>
                        <th className="p-4">Guest</th>
                        <th className="p-4">Suite / Villa</th>
                        <th className="p-4">Stay Dates</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-aegean-mist/40 text-sm font-light text-aegean-deep">
                    {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-50/30 transition-colors">
                            <td className="p-4 font-mono text-xs">#{booking.id}</td>
                            <td className="p-4">
                                <div className="font-normal">{booking.customerName}</div>
                                <div className="text-xs text-aegean-sky">{booking.customerEmail}</div>
                            </td>
                            <td className="p-4 uppercase text-xs tracking-wider">{booking.room?.slug.replace(/-/g, " ")}</td>
                            <td className="p-4 text-xs">
                                {format(new Date(booking.checkIn), "dd MMM yyyy")} — {format(new Date(booking.checkOut), "dd MMM yyyy")}
                            </td>
                            <td className="p-4 font-normal">€{Number(booking.totalPrice)}</td>
                            <td className="p-4">
                  <span className={`inline-block text-[9px] font-bold tracking-widest uppercase px-2 py-1 border ${
                      booking.status === "CONFIRMED" ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
                          booking.status === "CANCELLED" ? "bg-red-50 border-red-200 text-red-600" :
                              "bg-amber-50 border-amber-200 text-amber-700"
                  }`}>
                    {booking.status}
                  </span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                                {booking.status === "PENDING" && (
                                    <button
                                        onClick={() => handleStatusChange(booking.id, "CONFIRMED")}
                                        className="text-[10px] font-bold tracking-wider uppercase border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-3 py-1 transition-all"
                                    >
                                        Approve
                                    </button>
                                )}
                                {booking.status !== "CANCELLED" && (
                                    <button
                                        onClick={() => handleStatusChange(booking.id, "CANCELLED")}
                                        className="text-[10px] font-bold tracking-wider uppercase border border-red-400 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 transition-all"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}