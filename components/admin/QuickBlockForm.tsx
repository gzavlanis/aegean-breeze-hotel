"use client";

import React, { useState } from "react";

interface RoomOption {
    id: number;
    slug: string;
}

interface QuickBlockFormProps {
    rooms: RoomOption[];
    onSuccess?: () => void;
}

export default function QuickBlockForm({ rooms, onSuccess }: QuickBlockFormProps) {
    const [roomId, setRoomId] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/admin/rooms/block", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomId, checkIn, checkOut, reason }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to block room.");
            }

            setMessage({ type: "success", text: "Room blocked successfully! iCal updated." });
            setRoomId("");
            setCheckIn("");
            setCheckOut("");
            setReason("");
            if (onSuccess) onSuccess(); // Καλεί ανανέωση των δεδομένων αν χρειάζεται
        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border border-aegean-mist p-6 shadow-sm space-y-6">
            <div>
                <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">INVENTORY CONTROL</span>
                <h2 className="text-sm font-bold uppercase tracking-widest text-aegean-deep">Quick Freeze / Block Dates</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-1 block">SELECT ACCOMMODATION</label>
                    <select
                        required
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-xs font-light text-aegean-deep rounded-none"
                    >
                        <option value="" disabled>Choose a suite/villa...</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.slug.replace(/-/g, " ").toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-1 block">FREEZE FROM</label>
                        <input
                            type="date"
                            required
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-xs font-light text-aegean-deep rounded-none"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-1 block">FREEZE UNTIL</label>
                        <input
                            type="date"
                            required
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-xs font-light text-aegean-deep rounded-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-1 block">REASON / NOTES (OPTIONAL)</label>
                    <input
                        type="text"
                        placeholder="e.g. Annual deep cleaning, Private use"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-xs font-light text-aegean-deep rounded-none px-0"
                    />
                </div>

                {message && (
                    <p className={`text-xs font-bold uppercase tracking-wider ${message.type === "success" ? "text-emerald-600" : "text-red-500"}`}>
                        {message.text}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-aegean-deep hover:bg-neutral-800 text-white py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors rounded-none disabled:opacity-50"
                >
                    {loading ? "APPLYING LOCK..." : "FREEZE DATES"}
                </button>
            </form>
        </div>
    );
}