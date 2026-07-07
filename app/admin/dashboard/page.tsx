import AdminBookingsTable from "@/components/AdminBookingsTable";

export default async function AdminDashboardPage() {
    return (
        <main className="min-h-screen bg-slate-50/50 py-12 px-6 md:px-12 mt-16">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
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

                {/* Analytics Mini-Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-aegean-mist p-6 shadow-sm">
                        <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-2">REVENUE LEDGER</span>
                        <h3 className="text-2xl font-light text-aegean-deep">€14,250</h3>
                        <p className="text-[10px] text-emerald-600 mt-1">▲ +12% from direct web book engine</p>
                    </div>
                    <div className="bg-white border border-aegean-mist p-6 shadow-sm">
                        <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-2">TOTAL RESERVATIONS</span>
                        <h3 className="text-2xl font-light text-aegean-deep">42 Bookings</h3>
                        <p className="text-[10px] text-aegean-sky mt-1">Includes OTA channels integration</p>
                    </div>
                    <div className="bg-white border border-aegean-mist p-6 shadow-sm">
                        <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-2">CHANNEL SYNC STATUS</span>
                        <h3 className="text-2xl font-light text-emerald-600 uppercase text-sm tracking-widest font-bold mt-2">100% OPERATIONAL</h3>
                        <p className="text-[10px] text-aegean-sky mt-1">Airbnb & Booking.com endpoints active</p>
                    </div>
                </div>

                {/* Live Bookings Table Section */}
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