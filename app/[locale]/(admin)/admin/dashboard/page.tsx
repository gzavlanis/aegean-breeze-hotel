import { prisma } from "@/lib/prisma";
import AdminBookingsTable from "@/components/admin/AdminBookingsTable";
import AdminStatsCard from "@/components/admin/AdminStatsCard";
import AdminPerformanceChart from "@/components/admin/AdminPerformanceChart";
import React from "react";

export default async function AdminDashboardPage() {
    const totalBookingsCount = await prisma.booking.count({
        where: { status: { not: "CANCELLED" } }
    });

    const activeBookings = await prisma.booking.findMany({
        where: { status: { not: "CANCELLED" } },
        include: { room: true }
    });

    const totalRevenue = activeBookings.reduce((sum, b) => sum + Number(b.totalPrice || 0), 0);
    const roomStats: Record<string, { count: number; revenue: number; name: string }> = {};
    activeBookings.forEach((b) => {
        const slug = b.room.slug;
        if (!roomStats[slug]) {
            roomStats[slug] = {
                count: 0,
                revenue: 0,
                name: slug.replace(/-/g, " ").toUpperCase()
            };
        }
        roomStats[slug].count += 1;
        roomStats[slug].revenue += Number(b.totalPrice || 0);
    });

    const chartData = Object.values(roomStats);

    return (
        <main className="min-h-screen bg-slate-50/50 py-12 px-6 md:px-12 mt-16 text-aegean-deep">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-aegean-mist pb-6">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aegean-sky block mb-1">
                            PROPERTY MANAGEMENT SYSTEM
                        </span>
                        <h1 className="text-3xl font-light text-aegean-deep uppercase tracking-tight">
                            RESORT OVERVIEW
                        </h1>
                    </div>
                    <div className="text-xs font-mono text-aegean-sky">
                        SYSTEM STATUS: <span className="text-emerald-600 font-bold animate-pulse">● LIVE SYNC</span>
                    </div>
                </div>

                <AdminStatsCard
                    totalRevenue={totalRevenue}
                    totalBookingsCount={totalBookingsCount}
                />

                <AdminPerformanceChart
                    chartData={chartData}
                    totalRevenue={totalRevenue}
                    totalBookingsCount={totalBookingsCount}
                />

                <div className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-aegean-deep">
                        Recent Reservation Ledger
                    </h2>
                    <AdminBookingsTable />
                </div>

            </div>
        </main>
    );
}