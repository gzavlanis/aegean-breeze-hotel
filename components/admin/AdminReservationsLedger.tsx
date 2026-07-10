"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BookingModal from "./BookingModal";

interface Booking {
    id: number; roomId: number; customerName: string; customerEmail: string;
    checkIn: string; checkOut: string; totalPrice: string;
    status: "PENDING" | "CONFIRMED" | "CANCELLED"; room: { slug: string };
}
interface RoomOption { id: number; slug: string; basePrice: string }

interface LedgerProps {
    initialBookings: Booking[];
    rooms: RoomOption[]; // 🆕 Περνάμε και τα διαθέσιμα δωμάτια από τον Server
}

export default function AdminReservationsLedger({ initialBookings, rooms }: LedgerProps) {
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "BLOCKS" | "CANCELLED">("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState<20 | 50 | 100>(20);

    // 🆕 Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const router = useRouter();

    const handleRefreshData = async () => {
        router.refresh();
        const res = await fetch("/api/admin/calendar/data");
        window.location.reload();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you absolutely sure you want to PERMANENTLY DELETE this booking from the database?")) return;
        try {
            const res = await fetch(`/api/admin/reservations?id=${id}`, { method: "DELETE" });
            if (res.ok) handleRefreshData();
        } catch (err) { console.error(err); }
    };

    const filteredBookings = bookings.filter(b => {
        const isBlock = b.customerName.startsWith("INTERNAL_BLOCK");
        if (filter === "ACTIVE") return b.status !== "CANCELLED" && !isBlock;
        if (filter === "BLOCKS") return isBlock && b.status !== "CANCELLED";
        if (filter === "CANCELLED") return b.status === "CANCELLED";
        return true;
    });

    const totalItems = filteredBookings.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const activePage = currentPage > totalPages ? totalPages : currentPage;
    const startIndex = (activePage - 1) * pageSize;
    const paginatedBookings = filteredBookings.slice(startIndex, startIndex + pageSize);

    return (
        <div className="space-y-6">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-aegean-mist/40 pb-3">
                <div className="flex gap-6 text-xs uppercase tracking-widest font-medium">
                    {(["ALL", "ACTIVE", "BLOCKS", "CANCELLED"] as const).map((type) => (
                        <button key={type} onClick={() => { setFilter(type); setCurrentPage(1); }} className={`pb-3 transition-all relative ${filter === type ? "text-aegean-deep font-bold border-b-2 border-aegean-sky" : "text-aegean-deep/50 hover:text-aegean-deep"}`}>{type === "BLOCKS" ? "Internal Blocks" : type.toLowerCase()}</button>
                    ))}
                </div>

                {/* 🆕 Action Buttons: Add Manual Booking */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => { setSelectedBooking(null); setIsModalOpen(true); }}
                        className="bg-aegean-deep text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                    >
                        + Add Reservation
                    </button>
                    <div className="flex gap-1 bg-slate-100 p-0.5 font-mono text-[10px] font-bold uppercase text-aegean-sky items-center px-2">
                        <span>Show:</span>
                        {([20, 50, 100] as const).map((size) => (
                            <button key={size} onClick={() => { setPageSize(size); setCurrentPage(1); }} className={`px-1.5 py-0.5 ${pageSize === size ? "bg-white text-aegean-deep font-bold shadow-sm" : "text-aegean-deep/40"}`}>{size}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
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
                    {paginatedBookings.length === 0 ? (
                        <tr><td colSpan={8} className="p-8 text-center text-aegean-sky/60 italic">No records found.</td></tr>
                    ) : (
                        paginatedBookings.map((b) => {
                            const isBlock = b.customerName.startsWith("INTERNAL_BLOCK");
                            return (
                                <tr key={b.id} className="hover:bg-slate-50/40 transition-colors">
                                    <td className="p-4 font-mono text-aegean-sky">#{b.id}</td>
                                    <td className="p-4">
                                        <div className="font-medium text-aegean-deep">{isBlock ? b.customerName.replace("INTERNAL_BLOCK: ", "") : b.customerName}</div>
                                        {!isBlock && <div className="text-[10px] text-aegean-sky/80">{b.customerEmail}</div>}
                                    </td>
                                    <td className="p-4 uppercase font-medium tracking-tight">{b.room.slug.replace(/-/g, " ")}</td>
                                    <td className="p-4">{new Date(b.checkIn).toLocaleDateString("el-GR")}</td>
                                    <td className="p-4">{new Date(b.checkOut).toLocaleDateString("el-GR")}</td>
                                    <td className="p-4 font-mono font-medium">{isBlock ? "—" : `€${Number(b.totalPrice).toLocaleString("el-GR")}`}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${isBlock ? "bg-amber-100 text-amber-800" : b.status === "CONFIRMED" ? "bg-emerald-100 text-emerald-800" : b.status === "PENDING" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}`}>{isBlock ? "BLOCKED" : b.status}</span>
                                    </td>
                                    <td className="p-4 text-right space-x-3 font-bold uppercase tracking-wider text-[10px]">
                                        <button onClick={() => { setSelectedBooking(b); setIsModalOpen(true); }} className="text-aegean-sky hover:text-aegean-deep">Edit</button>
                                        <button onClick={() => handleDelete(b.id)} className="text-red-400 hover:text-red-600">Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            {totalItems > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-aegean-sky">
                    <div>Showing <span className="font-mono font-bold text-aegean-deep">{startIndex + 1}</span> to <span className="font-mono font-bold text-aegean-deep">{Math.min(startIndex + pageSize, totalItems)}</span> of <span className="font-mono font-bold text-aegean-deep">{totalItems}</span> entries</div>
                    <div className="flex items-center gap-2 font-mono">
                        <button disabled={activePage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="px-3 py-1 bg-white border border-aegean-mist uppercase text-[10px] disabled:opacity-30">← Prev</button>
                        <span className="text-aegean-deep text-xs font-light px-2">Page <span className="font-bold">{activePage}</span> of {totalPages}</span>
                        <button disabled={activePage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="px-3 py-1 bg-white border border-aegean-mist uppercase text-[10px] disabled:opacity-30">Next →</button>
                    </div>
                </div>
            )}

            {/* 🆕 THE POPUP DIALOG MODAL FORM */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleRefreshData}
                editingBooking={selectedBooking}
                rooms={rooms}
            />
        </div>
    );
}