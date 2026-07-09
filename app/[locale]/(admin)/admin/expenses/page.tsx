import React from "react";
import { prisma } from "@/lib/prisma";
import AdminExpensesYield from "@/components/admin/AdminExpensesYield";

export default async function AdminExpensesPage() {
    const activeBookings = await prisma.booking.findMany({
        where: { status: { not: "CANCELLED" } },
        select: { totalPrice: true }
    });

    const totalBookingsCount = activeBookings.length;
    const totalRevenue = activeBookings.reduce((sum, b) => sum + Number(b.totalPrice || 0), 0);

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
                            EXPENSES & YIELD
                        </h1>
                    </div>
                    <div className="text-xs font-mono text-aegean-sky">
                        FINANCIAL MATRIX: <span className="text-emerald-600 font-bold">LIVE METRICS ENABLED</span>
                    </div>
                </div>

                {/* The Interactive Financial Simulator Dashboard */}
                <AdminExpensesYield
                    totalRevenue={totalRevenue}
                    totalBookingsCount={totalBookingsCount}
                />
            </div>
        </main>
    );
}