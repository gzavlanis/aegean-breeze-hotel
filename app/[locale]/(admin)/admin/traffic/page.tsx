import React from "react";
import AdminTrafficView from "@/components/admin/AdminTrafficView";

export default async function AdminTrafficPage() {
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
                            WEB TRAFFIC ANALYTICS
                        </h1>
                    </div>
                    <div className="text-xs font-mono text-aegean-sky">
                        TRACKING ENGINE: <span className="text-emerald-600 font-bold">ACTIVE LOGGING</span>
                    </div>
                </div>

                {/* The Analytics UI Component */}
                <AdminTrafficView />
            </div>
        </main>
    );
}