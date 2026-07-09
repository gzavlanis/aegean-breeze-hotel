import React from "react";
import { prisma } from "@/lib/prisma";
import AdminReservationsLedger from "@/components/admin/AdminReservationsLedger";

export default async function AdminReservationsPage() {
    const allBookings = await prisma.booking.findMany({
        orderBy: { checkIn: "desc" },
        include: {
            room: {
                select: { slug: true }
            }
        }
    });

    const serializedBookings = allBookings.map(b => ({
        ...b,
        checkIn: b.checkIn.toISOString(),
        checkOut: b.checkOut.toISOString(),
        createdAt: b.createdAt.toISOString(),
        updatedAt: b.updatedAt.toISOString(),
        totalPrice: b.totalPrice.toString()
    }));

    return (
        <main className="min-h-screen bg-slate-50/50 py-12 px-6 md:px-12 text-aegean-deep">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-aegean-mist pb-6">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aegean-sky block mb-1">
                            PROPERTY MANAGEMENT SYSTEM
                        </span>
                        <h1 className="text-3xl font-light text-aegean-deep uppercase tracking-tight">
                            RESERVATIONS LEDGER
                        </h1>
                    </div>
                    <div className="text-xs font-mono text-aegean-sky">
                        RECORDS LOGGED: <span className="text-aegean-deep font-bold">{allBookings.length} total entries</span>
                    </div>
                </div>

                {/* The Interactive Ledger Content Component */}
                <AdminReservationsLedger initialBookings={serializedBookings as any} />
            </div>
        </main>
    );
}