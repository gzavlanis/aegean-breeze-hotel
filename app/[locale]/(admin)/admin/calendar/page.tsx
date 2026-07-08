import React from "react";
import AdminCalendarView from "@/components/admin/AdminCalendarView";

export default async function AdminCalendarPage() {
    return (
        <main className="min-h-screen bg-slate-50/50 py-12 px-6 md:px-12 text-aegean-deep">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-aegean-mist pb-6">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aegean-sky block mb-1">
                            PROPERTY MANAGEMENT SYSTEM
                        </span>
                        <h1 className="text-3xl font-light text-aegean-deep uppercase tracking-tight">
                            CALENDAR & RATES
                        </h1>
                    </div>
                    <div className="text-xs font-mono text-aegean-sky">
                        INVENTORY STATUS: <span className="text-emerald-600 font-bold">LIVE DISTRIBUTION active</span>
                    </div>
                </div>

                {/* Main Interactive Matrix Dashboard view */}
                <AdminCalendarView />
            </div>
        </main>
    );
}