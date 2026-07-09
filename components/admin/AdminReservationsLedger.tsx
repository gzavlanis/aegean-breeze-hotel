"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Booking {
    id: number;
    customerName: string;
    customerEmail: string;
    checkIn: string;
    checkOut: string;
    totalPrice: string;
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
    room: { slug: string };
}

interface LedgerProps {
    initialBookings: Booking[];
}

export default function AdminReservationsLedger({ initialBookings }: LedgerProps) {
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "BLOCKS" | "CANCELLED">("ALL");
    const router = useRouter();

    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/reservations/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus as any } : b));
                router.refresh();
            }
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const filteredBookings = bookings.filter(b => {
        const isBlock = b.customerName.startsWith("INTERNAL_BLOCK");
        if (filter === "ACTIVE") return b.status !== "CANCELLED" && !isBlock;
        if (filter === "BLOCKS") return isBlock && b.status !== "CANCELLED";
        if (filter === "CANCELLED") return b.status === "CANCELLED";
        return true; // ALL
    });

    return (
        <div className="space-y-6">
            {/* Elegant Filter Tabs */}
            <div className="flex border-b border-aegean-mist/40 gap-6 text-xs uppercase tracking-widest font-medium">
                {(["ALL", "ACTIVE", "BLOCKS", "CANCELLED"] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`pb-3 transition-all relative ${
                            filter === type
                                ? "text-aegean-deep font-bold border-b-2 border-aegean-sky"
                                : "text-aegean-deep/40 hover:text-aegean-deep"
                        }`}
                    >
                        {type === "BLOCKS" ? "Internal Blocks" : type.toLowerCase()}
                    </button>
                ))}
            </div>

            {/* Ledger Table Grid */}
            <div className="bg-white border border-aegean-mist/60 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                    <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-aegean-sky">
                        <th className="p-4">ID</th>
                        <th className="p-4">Guest / Reason</th>
                        <th className="p-4">Accommodation</th>
                        <th className="p-4">Check In</th>
                        <th className="p-4">Check Out</th>
                        <th className="p-4">Yield</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-light">
                    {filteredBookings.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="p-8 text-center text-aegean-sky/60 italic">
                                No records found matching this segment view.
                            </td>
                        </tr>
                    ) : (
                        filteredBookings.map((b) => {
                            const isBlock = b.customerName.startsWith("INTERNAL_BLOCK");
                            return (
                                <tr key={b.id} className="hover:bg-slate-50/40 transition-colors">
                                    <td className="p-4 font-mono text-aegean-sky">#{b.id}</td>
                                    <td className="p-4">
                                        <div className="font-medium text-aegean-deep">
                                            {isBlock ? b.customerName.replace("INTERNAL_BLOCK: ", "") : b.customerName}
                                        </div>
                                        {!isBlock && <div className="text-[10px] text-aegean-sky/80">{b.customerEmail}</div>}
                                    </td>
                                    <td className="p-4 uppercase font-medium tracking-tight">
                                        {b.room.slug.replace(/-/g, " ")}
                                    </td>
                                    <td className="p-4">{new Date(b.checkIn).toLocaleDateString("el-GR")}</td>
                                    <td className="p-4">{new Date(b.checkOut).toLocaleDateString("el-GR")}</td>
                                    <td className="p-4 font-mono font-medium">
                                        {isBlock ? "—" : `€${Number(b.totalPrice).toLocaleString("el-GR")}`}
                                    </td>
                                    <td className="p-4">
                                            <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                                isBlock ? "bg-amber-100 text-amber-800" :
                                                    b.status === "CONFIRMED" ? "bg-emerald-100 text-emerald-800" :
                                                        b.status === "PENDING" ? "bg-blue-100 text-blue-800" :
                                                            "bg-red-100 text-red-800"
                                            }`}>
                                                {isBlock ? "BLOCKED" : b.status}
                                            </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        {b.status !== "CANCELLED" ? (
                                            <button
                                                onClick={() => handleStatusChange(b.id, "CANCELLED")}
                                                className="text-[10px] font-bold text-red-500/70 hover:text-red-600 uppercase tracking-wider"
                                            >
                                                Cancel
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleStatusChange(b.id, "CONFIRMED")}
                                                className="text-[10px] font-bold text-emerald-600/70 hover:text-emerald-600 uppercase tracking-wider"
                                            >
                                                Restore
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}