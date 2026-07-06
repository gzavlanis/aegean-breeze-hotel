"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import { IconArrowRight } from "./AegeanIcons";

import "react-day-picker/dist/style.css";

interface BookingFormProps {
    roomId: number;
    basePrice: number;
    maxGuests: number;
}

export default function BookingForm({ roomId, basePrice, maxGuests }: BookingFormProps) {
    const t = useTranslations("Rooms");

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [range, setRange] = useState<DateRange | undefined>();
    const [disabledDays, setDisabledDays] = useState<Date[]>([]);

    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
        type: null,
        msg: "",
    });

    // 1. Fetch τις κλεισμένες μέρες κατά το Mount
    useEffect(() => {
        fetch(`/api/rooms/${roomId}/booked-dates`)
            .then((res) => res.json())
            .then((datesStrArray: string[]) => {
                const datesObjArray = datesStrArray.map((dateStr) => new Date(dateStr));
                setDisabledDays(datesObjArray);
            })
            .catch((err) => console.error("Error loading disabled dates:", err));
    }, [roomId]);

    useEffect(() => {
        if (range?.from && range?.to) {
            const timeDiff = Math.abs(range.to.getTime() - range.from.getTime());
            const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setTotalPrice(nights * basePrice);
        } else {
            setTotalPrice(null);
        }
    }, [range, basePrice]);

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!range?.from || !range?.to) {
            setStatus({ type: "error", msg: "Παρακαλώ επιλέξτε ημερομηνίες διαμονής." });
            return;
        }

        setLoading(true);
        setStatus({ type: null, msg: "" });

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomId,
                    customerName,
                    customerEmail,
                    checkIn: format(range.from, "yyyy-MM-dd"),
                    checkOut: format(range.to, "yyyy-MM-dd"),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus({ type: "error", msg: data.error });
            } else {
                setStatus({
                    type: "success",
                    msg: `Η κράτηση ολοκληρώθηκε επιτυχώς! Κωδικός: ${data.booking.id}`,
                });
                setCustomerName("");
                setCustomerEmail("");
                setRange(undefined);
            }
        } catch (err) {
            setStatus({ type: "error", msg: "Αποτυχία σύνδεσης με τον server." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-aegean-white p-6 md:p-8 border border-aegean-mist sticky top-24">
            <h3 className="text-xl font-light text-aegean-deep uppercase tracking-tight mb-2">
                {t("reserve_title")}
            </h3>
            <p className="text-xs text-aegean-sky font-bold tracking-widest uppercase mb-6">
                {t("from")} €{basePrice} / {t("per_night")}
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-2 block">FULL NAME</label>
                    <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-sm font-light transition-colors rounded-none px-0"
                        placeholder="Georgios Zavlanis"
                    />
                </div>

                <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-2 block">EMAIL ADDRESS</label>
                    <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-sm font-light transition-colors rounded-none px-0"
                        placeholder="george@example.com"
                    />
                </div>

                {/* LUXURY INTERACTIVE CALENDAR */}
                <div className="flex flex-col items-center border border-aegean-mist/40 p-4 bg-slate-50/50">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-4 self-start">
                        SELECT DATES
                    </label>
                    <DayPicker
                        mode="range"
                        selected={range}
                        onSelect={setRange}
                        disabled={[
                            { before: new Date() },
                            ...disabledDays
                        ]}
                        className="mx-auto font-light text-sm"
                    />
                </div>

                {/* Live Price Summary */}
                {totalPrice !== null && (
                    <div className="border-t border-b border-aegean-mist/60 py-4 flex justify-between items-center text-xs tracking-widest uppercase font-bold text-aegean-deep">
                        <span>ESTIMATED TOTAL:</span>
                        <span className="text-base text-aegean-sky">€{totalPrice}</span>
                    </div>
                )}

                {status.type && (
                    <div className={`text-xs uppercase tracking-widest font-bold ${status.type === "success" ? "text-emerald-600" : "text-red-500"}`}>
                        {status.msg}
                    </div>
                )}

                <motion.button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-aegean-deep text-white py-5 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4 group transition-all ${loading ? "opacity-50" : ""}`}
                >
                    {loading ? "PROCESSING..." : t("book_now_btn")}
                    {!loading && <IconArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
                </motion.button>
            </form>
        </div>
    );
}