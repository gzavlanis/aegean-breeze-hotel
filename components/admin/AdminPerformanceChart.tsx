import React from "react";

interface ChartItem {
    name: string;
    count: number;
    revenue: number;
}

interface AdminPerformanceChartProps {
    chartData: ChartItem[];
    totalRevenue: number;
    totalBookingsCount: number;
}

export default function AdminPerformanceChart({chartData, totalRevenue, totalBookingsCount}: AdminPerformanceChartProps) {
    const maxBookings = Math.max(...chartData.map(d => d.count), 1);
    const mostBookedRoom = [...chartData].sort((a, b) => b.count - a.count)[0]?.name || "None Yet";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Bar Chart Section */}
            <div className="bg-white border border-aegean-mist p-6 shadow-sm lg:col-span-2 space-y-6">
                <div>
                    <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">VISUAL METRICS</span>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-aegean-deep">Accommodations Performance</h2>
                </div>

                <div className="space-y-4 pt-4">
                    {chartData.length === 0 ? (
                        <p className="text-xs text-aegean-sky font-light italic">No booking data available to generate chart yet.</p>
                    ) : (
                        chartData.map((data) => {
                            const percentage = (data.count / maxBookings) * 100;
                            return (
                                <div key={data.name} className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-aegean-deep/80 truncate max-w-[200px] sm:max-w-none">{data.name}</span>
                                        <span className="font-mono text-aegean-sky">{data.count} bookings (€{data.revenue})</span>
                                    </div>
                                    <div className="w-full h-6 bg-slate-100 relative overflow-hidden">
                                        <div
                                            className="h-full bg-aegean-sky/40 border-r-2 border-aegean-sky transition-all duration-1000 ease-out"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Insights Section */}
            <div className="bg-white border border-aegean-mist p-6 shadow-sm flex flex-col justify-between">
                <div>
                    <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">INSIGHTS</span>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-aegean-deep">Yield Distribution</h2>
                </div>

                <div className="space-y-4 my-auto pt-6 lg:pt-0">
                    <div className="border-b border-slate-100 pb-3">
                        <span className="text-[10px] uppercase text-aegean-sky block font-bold tracking-wider">Average Ticket</span>
                        <span className="text-xl font-light">
                            €{totalBookingsCount > 0 ? Math.round(totalRevenue / totalBookingsCount).toLocaleString("el-GR") : 0}
                        </span>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase text-aegean-sky block font-bold tracking-wider">Most Booked Category</span>
                        <span className="text-sm font-medium uppercase tracking-tight text-aegean-deep">
                            {mostBookedRoom}
                        </span>
                    </div>
                </div>

                <div className="text-[10px] text-aegean-sky/70 font-light italic border-t border-slate-100 pt-3">
                    Metrics update automatically upon new synchronization hooks.
                </div>
            </div>
        </div>
    );
}