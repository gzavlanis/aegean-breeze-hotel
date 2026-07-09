"use client";

import React, { useState } from "react";

interface AdminExpensesYieldProps {
    totalRevenue: number;
    totalBookingsCount: number;
}

export default function AdminExpensesYield({ totalRevenue, totalBookingsCount }: AdminExpensesYieldProps) {
    const [fixedExpenses, setFixedExpenses] = useState(1200);
    const [variableExpenses, setVariableExpenses] = useState(450);
    const [channelCommissions, setChannelCommissions] = useState(15);
    const otaFeesCost = totalRevenue * (channelCommissions / 100);
    const totalExpenses = fixedExpenses + variableExpenses + otaFeesCost;
    const netProfit = Math.max(0, totalRevenue - totalExpenses);
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    return (
        <div className="space-y-8">

            {/* Real-Time Profit Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm">
                    <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">GROSS REVENUE</span>
                    <h3 className="text-2xl font-light text-aegean-deep">€{totalRevenue.toLocaleString("el-GR")}</h3>
                    <p className="text-[10px] text-aegean-sky mt-1">From {totalBookingsCount} active bookings</p>
                </div>

                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm">
                    <span className="text-[9px] font-bold tracking-widest text-red-500/80 uppercase block mb-1">ESTIMATED EXPENSES</span>
                    <h3 className="text-2xl font-light text-red-600/90">-€{Math.round(totalExpenses).toLocaleString("el-GR")}</h3>
                    <p className="text-[10px] text-aegean-sky mt-1">Operational + OTA fees combined</p>
                </div>

                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm bg-emerald-50/20 border-emerald-600/20">
                    <span className="text-[9px] font-bold tracking-widest text-emerald-600 uppercase block mb-1">NET YIELD (PROFIT)</span>
                    <h3 className="text-2xl font-bold text-emerald-600">€{Math.round(netProfit).toLocaleString("el-GR")}</h3>
                    <p className="text-[10px] text-emerald-600 mt-1">Pure revenue after deductions</p>
                </div>

                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm">
                    <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">PROFIT MARGIN</span>
                    <h3 className="text-2xl font-light text-aegean-deep">{profitMargin.toFixed(1)}%</h3>
                    <div className="w-full h-1.5 bg-slate-100 mt-2 relative overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-500"
                            style={{ width: `${profitMargin}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Dynamic Expense Control & Breakdown Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Inputs Panel */}
                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm space-y-6">
                    <div>
                        <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">YIELD LEDGER CONTROL</span>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-aegean-deep">Operating Expenses</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-1 block">
                                FIXED EXPENSES (€)
                            </label>
                            <input
                                type="number"
                                value={fixedExpenses}
                                onChange={(e) => setFixedExpenses(Number(e.target.value))}
                                className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-sm font-mono text-aegean-deep rounded-none"
                            />
                            <span className="text-[9px] text-aegean-sky/60 block mt-1">Utilities, internet, insurance, staff salaries</span>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-1 block">
                                VARIABLE MAINTENANCE (€)
                            </label>
                            <input
                                type="number"
                                value={variableExpenses}
                                onChange={(e) => setVariableExpenses(Number(e.target.value))}
                                className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-sm font-mono text-aegean-deep rounded-none"
                            />
                            <span className="text-[9px] text-aegean-sky/60 block mt-1">Laundry, guest amenities, localized repairs</span>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-1 block">
                                AVERAGE CHANNEL COMMISSION (%)
                            </label>
                            <input
                                type="number"
                                max="100"
                                value={channelCommissions}
                                onChange={(e) => setChannelCommissions(Number(e.target.value))}
                                className="w-full bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none py-2 text-sm font-mono text-aegean-deep rounded-none"
                            />
                            <span className="text-[9px] text-aegean-sky/60 block mt-1">Airbnb (~3-5%) or Booking.com (~15%) weight</span>
                        </div>
                    </div>
                </div>

                {/* Visual Distribution Chart Side */}
                <div className="bg-white border border-aegean-mist/60 p-6 shadow-sm lg:col-span-2 space-y-6">
                    <div>
                        <span className="text-[9px] font-bold tracking-widest text-aegean-sky uppercase block mb-1">DISTRIBUTION BREAKDOWN</span>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-aegean-deep">Where is the capital allocated?</h2>
                    </div>

                    {/* Pure Tailwind Linear Segment Chart */}
                    <div className="space-y-4 pt-2">
                        {totalRevenue === 0 ? (
                            <p className="text-xs text-aegean-sky font-light italic">No revenue recorded to generate financial distribution charts.</p>
                        ) : (
                            <div className="space-y-4">
                                {/* Segment 1: Net Profit */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-emerald-700 font-bold">Net Profit Margin</span>
                                        <span className="font-mono text-slate-500">{((netProfit / totalRevenue) * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 relative overflow-hidden">
                                        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(netProfit / totalRevenue) * 100}%` }} />
                                    </div>
                                </div>

                                {/* Segment 2: OTA Fees */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-aegean-deep">OTA & Channel Deductions</span>
                                        <span className="font-mono text-slate-500">{((otaFeesCost / totalRevenue) * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 relative overflow-hidden">
                                        <div className="h-full bg-aegean-sky/60 transition-all duration-300" style={{ width: `${(otaFeesCost / totalRevenue) * 100}%` }} />
                                    </div>
                                </div>

                                {/* Segment 3: Fixed Expenses */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-aegean-deep">Fixed Infrastructure Costs</span>
                                        <span className="font-mono text-slate-500">{((fixedExpenses / totalRevenue) * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 relative overflow-hidden">
                                        <div className="h-full bg-amber-500/50 transition-all duration-300" style={{ width: `${(fixedExpenses / totalRevenue) * 100}%` }} />
                                    </div>
                                </div>

                                {/* Segment 4: Variable Costs */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-aegean-deep">Variable Maintenance & Upkeep</span>
                                        <span className="font-mono text-slate-500">{((variableExpenses / totalRevenue) * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 relative overflow-hidden">
                                        <div className="h-full bg-rose-400/50 transition-all duration-300" style={{ width: `${(variableExpenses / totalRevenue) * 100}%` }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}