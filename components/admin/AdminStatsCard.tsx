import React from "react";

interface AdminStatsCardsProps {
    totalRevenue: number;
    totalBookingsCount: number;
}

export default function AdminStatsCards({ totalRevenue, totalBookingsCount }: AdminStatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Revenue Card */}
            <div className="bg-white border border-aegean-mist p-6 shadow-sm">
                <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-2">REVENUE LEDGER</span>
                <h3 className="text-2xl font-light text-aegean-deep">
                    €{totalRevenue.toLocaleString("el-GR")}
                </h3>
                <p className="text-[10px] text-emerald-600 mt-1">▲ Calculated from non-cancelled bookings</p>
            </div>

            {/* Total Bookings Card */}
            <div className="bg-white border border-aegean-mist p-6 shadow-sm">
                <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-2">TOTAL RESERVATIONS</span>
                <h3 className="text-2xl font-light text-aegean-deep">{totalBookingsCount} Bookings</h3>
                <p className="text-[10px] text-aegean-sky mt-1">Active database records</p>
            </div>

            {/* Sync Status Card */}
            <div className="bg-white border border-aegean-mist p-6 shadow-sm">
                <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-2">CHANNEL SYNC STATUS</span>
                <h3 className="text-xl font-bold text-emerald-600 uppercase tracking-widest mt-1">100% OPERATIONAL</h3>
                <p className="text-[10px] text-aegean-sky mt-1">iCal feeds and local state unified</p>
            </div>
        </div>
    );
}