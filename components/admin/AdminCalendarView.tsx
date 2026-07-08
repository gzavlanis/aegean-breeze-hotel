"use client";

import React, { useState, useEffect, useCallback } from "react";
import QuickBlockForm from "./QuickBlockForm";

interface Booking {
    id: number;
    customerName: string;
    checkIn: string;
    checkOut: string;
    status: string;
}

interface Room {
    id: number;
    slug: string;
    basePrice: string;
    bookings: Booking[];
}

export default function AdminCalendarView() {
    const [currentYear, setCurrentYear] = useState(2026);
    const [currentMonth, setCurrentMonth] = useState(7);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const fetchCalendarData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/calendar/data?year=${currentYear}&month=${currentMonth}`);
            if (res.ok) {
                const data = await res.json();
                setRooms(data.rooms || []);
            }
        } catch (err) {
            console.error("Failed to load calendar data", err);
        } finally {
            setLoading(false);
        }
    }, [currentYear, currentMonth]);

    useEffect(() => {
        fetchCalendarData();
    }, [fetchCalendarData]);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const changeMonth = (direction: "prev" | "next") => {
        if (direction === "prev") {
            if (currentMonth === 1) {
                setCurrentMonth(12);
                setCurrentYear(currentYear - 1);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        } else {
            if (currentMonth === 12) {
                setCurrentMonth(1);
                setCurrentYear(currentYear + 1);
            } else {
                setCurrentMonth(currentMonth + 1);
            }
        }
    };

    const getDayStatus = (room: Room, day: number) => {
        const targetDate = new Date(currentYear, currentMonth - 1, day);

        for (const booking of room.bookings) {
            const start = new Date(booking.checkIn);
            const end = new Date(booking.checkOut);

            // Normalize dates για καθαρό σύγκριση ημερών
            start.setHours(0,0,0,0);
            end.setHours(0,0,0,0);
            targetDate.setHours(0,0,0,0);

            if (targetDate >= start && targetDate < end) {
                const isBlock = booking.customerName.startsWith("INTERNAL_BLOCK");
                return {
                    booked: true,
                    isBlock,
                    name: booking.customerName.replace("INTERNAL_BLOCK: ", "")
                };
            }
        }
        return { booked: false, isBlock: false, name: "" };
    };

    return (
        <div className="space-y-8">
            {/* Calendar Sub-Header Controller */}
            <div className="flex items-center justify-between bg-white border border-aegean-mist/60 p-4 shadow-sm">
                <button
                    onClick={() => changeMonth("prev")}
                    className="text-xs uppercase tracking-widest text-aegean-sky hover:text-aegean-deep transition-colors font-medium px-3 py-1"
                >
                    ← Prev
                </button>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-aegean-deep">
                    {monthNames[currentMonth - 1]} {currentYear}
                </h2>
                <button
                    onClick={() => changeMonth("next")}
                    className="text-xs uppercase tracking-widest text-aegean-sky hover:text-aegean-deep transition-colors font-medium px-3 py-1"
                >
                    Next →
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
                {/* 📅 Timeline Grid (Left / Major side) */}
                <div className="xl:col-span-3 bg-white border border-aegean-mist/60 shadow-sm overflow-x-auto">
                    <div className="min-w-[800px] divide-y divide-slate-100">

                        {/* Header Row: Days columns */}
                        <div className="flex bg-slate-50/50 text-center font-mono">
                            <div className="w-48 p-4 text-left text-[10px] font-bold tracking-wider text-aegean-sky border-r border-slate-100 uppercase">
                                Accommodations
                            </div>
                            <div className="flex-1 grid grid-cols-31 gap-0">
                                {daysArray.map((day) => (
                                    <div
                                        key={day}
                                        className="p-3 text-[10px] font-medium border-r border-slate-100 text-aegean-deep/70 flex items-center justify-center h-full"
                                        style={{ gridColumn: day }}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rooms Rows Content */}
                        {loading ? (
                            <div className="p-12 text-center text-xs text-aegean-sky uppercase tracking-widest animate-pulse">
                                Syncing Timeline Ledger...
                            </div>
                        ) : (
                            rooms.map((room) => (
                                <div key={room.id} className="flex items-center">
                                    {/* Room Label Column */}
                                    <div className="w-48 p-4 text-xs font-bold uppercase tracking-wider text-aegean-deep border-r border-slate-100 truncate bg-slate-50/20">
                                        {room.slug.replace(/-/g, " ")}
                                        <span className="block text-[9px] font-mono text-aegean-sky font-light mt-0.5">
                                            €{Number(room.basePrice)}/nt
                                        </span>
                                    </div>

                                    {/* Month Days Block Mapping */}
                                    <div className="flex-1 grid grid-cols-31 gap-0 h-14 relative bg-[#FAF9F6]/20">
                                        {daysArray.map((day) => {
                                            const status = getDayStatus(room, day);
                                            return (
                                                <div
                                                    key={day}
                                                    className={`border-r border-slate-100/60 h-full relative group transition-colors ${
                                                        status.booked
                                                            ? status.isBlock
                                                                ? "bg-amber-500/20 border-l-2 border-amber-500"
                                                                : "bg-aegean-sky/20 border-l-2 border-aegean-sky"
                                                            : "hover:bg-slate-50"
                                                    }`}
                                                    style={{ gridColumn: day }}
                                                    title={status.booked ? status.name : `Day ${day} - Available`}
                                                >
                                                    {status.booked && (
                                                        <div className="absolute inset-0 flex items-center px-1 overflow-hidden pointer-events-none">
                                                            <span className="text-[8px] font-bold uppercase tracking-tight text-aegean-deep/80 truncate">
                                                                {status.name}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Visual Legend Guide */}
                    <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex gap-6 text-[10px] font-bold uppercase tracking-wider text-aegean-sky">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-aegean-sky/20 border-l-2 border-aegean-sky block" />
                            Active Reservations
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-amber-500/20 border-l-2 border-amber-500 block" />
                            Internal Blocks / Frozen
                        </div>
                    </div>
                </div>

                {/* 🔒 Quick Freeze Action Pane (Right sidebar panel) */}
                <div className="space-y-4">
                    <QuickBlockForm
                        rooms={rooms.map(r => ({ id: r.id, slug: r.slug }))}
                        onSuccess={fetchCalendarData}
                    />
                </div>
            </div>
        </div>
    );
}