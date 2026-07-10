"use client";

import React, { useState, useEffect } from "react";

interface TrafficState {
    overview: { uniqueVisitors: number; pageViews: number; bounceRate: string; avgSessionDuration: string };
    sources: { name: string; count: number; percentage: number }[];
    devices: { type: string; percentage: number }[];
    monthlyTrend: { date: string; views: number }[];
}

export default function AdminTrafficView() {
    const [data, setData] = useState<TrafficState | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/traffic/data")
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => console.error("Error loading traffic metrics:", err));
    }, []);

    if (loading || !data) {
        return <div className="p-12 text-center text-xs uppercase tracking-widest text-aegean-sky animate-pulse">Gathering Server Traffic Metrics...</div>;
    }

    const maxTrendValue = Math.max(...data.monthlyTrend.map(t => t.views), 1);

    return (
        <div className="space-y-8 text-aegean-deep">

            {/* 📈 1. Analytics KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm">
                    <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">UNIQUE VISITORS</span>
                    <h3 className="text-2xl font-light">{data.overview.uniqueVisitors.toLocaleString("el-GR")}</h3>
                    <p className="text-[10px] text-emerald-600 mt-1">▲ +8.2% this week</p>
                </div>
                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm">
                    <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">PAGE VIEWS</span>
                    <h3 className="text-2xl font-light">{data.overview.pageViews.toLocaleString("el-GR")}</h3>
                    <p className="text-[10px] text-aegean-sky mt-1">Ratio: {(data.overview.pageViews / data.overview.uniqueVisitors).toFixed(1)} views/user</p>
                </div>
                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm">
                    <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">BOUNCE RATE</span>
                    <h3 className="text-2xl font-light">{data.overview.bounceRate}</h3>
                    <p className="text-[10px] text-emerald-600 mt-1">▼ -2.1% exit optimization</p>
                </div>
                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm">
                    <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">AVG. VISIT DURATION</span>
                    <h3 className="text-2xl font-light">{data.overview.avgSessionDuration}</h3>
                    <p className="text-[10px] text-aegean-sky mt-1">High engagement on room sheets</p>
                </div>
            </div>

            {/* 📊 2. Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Traffic Sources (Bar Chart) */}
                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm lg:col-span-2 space-y-6">
                    <div>
                        <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">ACQUISITION Channels</span>
                        <h2 className="text-sm font-bold uppercase tracking-widest">Where do visitors come from?</h2>
                    </div>
                    <div className="space-y-4 pt-2">
                        {data.sources.map((source) => (
                            <div key={source.name} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                    <span className="font-medium text-aegean-deep/80">{source.name}</span>
                                    <span className="font-mono text-aegean-sky">{source.count} hits ({source.percentage}%)</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 relative overflow-hidden">
                                    <div className="h-full bg-aegean-sky/50 border-r border-aegean-sky transition-all duration-1000" style={{ width: `${source.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Device Breakdown */}
                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm space-y-6">
                    <div>
                        <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">DEVICE SEGMENTATION</span>
                        <h2 className="text-sm font-bold uppercase tracking-widest">Platform Split</h2>
                    </div>
                    <div className="space-y-4 pt-4">
                        {data.devices.map((device) => (
                            <div key={device.type} className="flex items-center justify-between border-b border-slate-50 pb-2 text-xs">
                                <span className="font-medium">{device.type}</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-24 h-2 bg-slate-100 rounded-full relative overflow-hidden hidden sm:block">
                                        <div className="h-full bg-aegean-deep" style={{ width: `${device.percentage}%` }} />
                                    </div>
                                    <span className="font-mono font-bold text-aegean-sky">{device.percentage}%</span>
                                </div>
                            </div>
                        ))}
                        <p className="text-[10px] text-aegean-sky/70 font-light italic pt-4 border-t border-slate-100">
                            * Prioritize mobile UX asset generation based on 68% active split.
                        </p>
                    </div>
                </div>
            </div>

            {/* 📅 3. Weekly Trend Mini-Timeline Chart */}
            <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm space-y-4">
                <div>
                    <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">ACTIVITY HISTOGRAM</span>
                    <h2 className="text-sm font-bold uppercase tracking-widest">Weekly Page View Momentum</h2>
                </div>
                {/* Vertical Bar Grid Chart */}
                <div className="flex items-end justify-between h-32 pt-6 px-4 border-b border-slate-100 font-mono text-[9px]">
                    {data.monthlyTrend.map((trend) => {
                        const heightPct = (trend.views / maxTrendValue) * 100;
                        return (
                            <div key={trend.date} className="flex flex-col items-center flex-1 group">
                                <span className="opacity-0 group-hover:opacity-100 text-aegean-deep font-bold mb-1 transition-opacity duration-200">
                                    {trend.views}
                                </span>
                                <div
                                    className="w-8 sm:w-12 bg-slate-100 group-hover:bg-aegean-sky/30 border-t-2 border-transparent group-hover:border-aegean-sky transition-all duration-500 ease-out"
                                    style={{ height: `${heightPct}%` }}
                                />
                                <span className="mt-2 text-aegean-sky/80">{trend.date}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}