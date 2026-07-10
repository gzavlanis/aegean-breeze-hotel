"use client";

import React, { useState, useEffect } from "react";

interface RoomOption {
    id: number;
    slug: string;
    basePrice: string;
}

interface Booking {
    id?: number;
    roomId: number;
    customerName: string;
    customerEmail: string;
    checkIn: string;
    checkOut: string;
    totalPrice: string;
    status: string;
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    editingBooking?: Booking | null;
    rooms: RoomOption[];
}

export default function BookingModal({ isOpen, onClose, onSave, editingBooking, rooms }: BookingModalProps) {
    const [formData, setFormData] = useState<Booking>({
        roomId: 0,
        customerName: "",
        customerEmail: "",
        checkIn: "",
        checkOut: "",
        totalPrice: "",
        status: "CONFIRMED"
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 1. 🔄 Συγχρονισμός και σωστή αρχικοποίηση της φόρμας (Create ή Edit Mode)
    useEffect(() => {
        if (!isOpen) return;

        if (editingBooking) {
            setFormData({
                ...editingBooking,
                roomId: Number(editingBooking.roomId),
                checkIn: editingBooking.checkIn.split("T")[0],
                checkOut: editingBooking.checkOut.split("T")[0],
                totalPrice: Number(editingBooking.totalPrice).toString()
            });
        } else {
            setFormData({
                roomId: rooms[0]?.id || 0,
                customerName: "",
                customerEmail: "",
                checkIn: "",
                checkOut: "",
                totalPrice: "",
                status: "CONFIRMED"
            });
        }
        setError("");
    }, [editingBooking, isOpen, rooms]);

    // 2. 💵 Απομονωμένος και ασφαλής υπολογισμός τιμής (μόνο στο Create Mode)
    // Διαβάζουμε ξεχωριστά τα πεδία για να αποφύγουμε infinite loops με το formData object
    const { checkIn, checkOut, roomId } = formData;

    useEffect(() => {
        if (editingBooking) return; // Στο Edit Mode ο ιδιοκτήτης μπορεί να αλλάξει χειροκίνητα την τιμή

        if (checkIn && checkOut && roomId) {
            const selectedRoom = rooms.find(r => r.id === Number(roomId));
            if (selectedRoom) {
                const diffTime = new Date(checkOut).getTime() - new Date(checkIn).getTime();
                const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (nights > 0) {
                    const calculatedPrice = nights * Number(selectedRoom.basePrice);
                    setFormData(prev => ({
                        ...prev,
                        totalPrice: calculatedPrice.toString()
                    }));
                } else {
                    setFormData(prev => ({ ...prev, totalPrice: "" }));
                }
            }
        }
    }, [checkIn, checkOut, roomId, rooms, editingBooking]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const url = editingBooking ? `/api/admin/reservations/${editingBooking.id}` : "/api/admin/reservations";
        const method = editingBooking ? "PATCH" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Operation failed.");

            onSave();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-aegean-deep/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-aegean-mist w-full max-w-md p-6 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-200 text-aegean-deep">
                <div>
                    <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">DIRECT SYSTEM ENTRY</span>
                    <h2 className="text-sm font-bold uppercase tracking-widest">
                        {editingBooking ? `Edit Booking #${editingBooking.id}` : "Create Manual Reservation"}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div>
                        <label className="text-[9px] font-bold uppercase text-aegean-sky block mb-1">Accommodation</label>
                        <select
                            value={formData.roomId}
                            onChange={e => setFormData({ ...formData, roomId: Number(e.target.value) })}
                            className="w-full bg-transparent border-b border-aegean-mist py-2 outline-none font-medium rounded-none"
                        >
                            {rooms.map(r => (
                                <option key={r.id} value={r.id}>
                                    {r.slug.replace(/-/g, " ").toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[9px] font-bold uppercase text-aegean-sky block mb-1">Guest Name</label>
                            <input
                                type="text"
                                required
                                value={formData.customerName}
                                onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                                className="w-full bg-transparent border-b border-aegean-mist py-1.5 outline-none rounded-none"
                            />
                        </div>
                        <div>
                            <label className="text-[9px] font-bold uppercase text-aegean-sky block mb-1">Guest Email</label>
                            <input
                                type="email"
                                required
                                value={formData.customerEmail}
                                onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                                className="w-full bg-transparent border-b border-aegean-mist py-1.5 outline-none rounded-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[9px] font-bold uppercase text-aegean-sky block mb-1">Check In</label>
                            <input
                                type="date"
                                required
                                value={formData.checkIn}
                                onChange={e => setFormData({ ...formData, checkIn: e.target.value })}
                                className="w-full bg-transparent border-b border-aegean-mist py-1.5 outline-none rounded-none"
                            />
                        </div>
                        <div>
                            <label className="text-[9px] font-bold uppercase text-aegean-sky block mb-1">Check Out</label>
                            <input
                                type="date"
                                required
                                value={formData.checkOut}
                                onChange={e => setFormData({ ...formData, checkOut: e.target.value })}
                                className="w-full bg-transparent border-b border-aegean-mist py-1.5 outline-none rounded-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[9px] font-bold uppercase text-aegean-sky block mb-1">Total Yield (€)</label>
                            <input
                                type="number"
                                required
                                value={formData.totalPrice}
                                onChange={e => setFormData({ ...formData, totalPrice: e.target.value })}
                                className="w-full bg-transparent border-b border-aegean-mist py-1.5 font-mono rounded-none"
                            />
                        </div>
                        <div>
                            <label className="text-[9px] font-bold uppercase text-aegean-sky block mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                                className="w-full bg-transparent border-b border-aegean-mist py-2 outline-none rounded-none"
                            >
                                <option value="CONFIRMED">CONFIRMED</option>
                                <option value="PENDING">PENDING</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>
                    </div>

                    {error && <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 pt-1">{error}</p>}

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-aegean-mist uppercase tracking-widest text-[9px] font-bold transition-colors hover:bg-slate-50 rounded-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-aegean-deep text-white uppercase tracking-widest text-[9px] font-bold transition-colors hover:bg-neutral-800 disabled:opacity-50 rounded-none"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}