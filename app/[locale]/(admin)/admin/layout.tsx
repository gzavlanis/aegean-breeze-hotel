"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { IconMenu, IconClose, IconGlobe, IconGuests, IconSquareMeters, IconBed } from "@/components/AegeanIcons";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminZoneLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const locale = useLocale();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navigationTabs = [
        {
            name: "Overview",
            href: "/admin/dashboard",
            icon: IconSquareMeters,
        },
        {
            name: "Calendar & Rates",
            href: "/admin/calendar",
            icon: IconBed,
        },
        {
            name: "Reservations",
            href: "/admin/reservations",
            icon: IconGuests,
        },
        {
            name: "Expenses & Yield",
            href: "/admin/expenses",
            icon: IconGlobe,
        },
        {
            name: "Web Traffic",
            href: "/admin/traffic",
            icon: IconGlobe
        },
    ];

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-aegean-deep flex flex-col md:flex-row font-light">

            {/* 📱 Mobile Header Bar */}
            <header className="md:hidden w-full h-16 bg-white border-b border-aegean-mist/60 px-6 flex items-center justify-between sticky top-0 z-50">
                <div className="flex flex-col">
                    <span className="text-[9px] font-bold tracking-[0.3em] text-aegean-sky">AETHRA</span>
                    <span className="text-xs font-medium uppercase tracking-wider text-aegean-deep">Portal</span>
                </div>
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-2 text-aegean-deep/80 hover:text-aegean-sky transition-colors"
                >
                    {isMobileOpen ? <IconClose className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
                </button>
            </header>

            {/* 💻 Sidebar Navigation Layout */}
            <aside className={cn(
                "w-full md:w-64 bg-white border-r border-aegean-mist/60 flex flex-col justify-between md:sticky md:top-0 md:h-screen z-40 transition-all duration-300 fixed md:translate-x-0 h-[calc(100vh-64px)] top-16 md:top-0",
                isMobileOpen ? "translate-x-0" : "-translate-x-full"
            )}>

                {/* Upper Section: Brand & Navigation Links */}
                <div className="p-8 space-y-12">
                    {/* Editorial Branding Logo */}
                    <div className="hidden md:flex flex-col border-b border-aegean-mist/40 pb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aegean-sky mb-1">
                            AETHRA RESORT
                        </span>
                        <span className="text-sm font-light uppercase tracking-widest text-aegean-deep">
                            MANAGEMENT
                        </span>
                    </div>

                    {/* Navigation Menu Links */}
                    <nav className="flex flex-col gap-2">
                        {navigationTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = pathname === tab.href;

                            return (
                                <Link
                                    key={tab.name}
                                    href={tab.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={cn(
                                        "flex items-center gap-4 px-4 py-3 text-xs uppercase tracking-widest font-medium transition-all duration-300 relative group",
                                        isActive
                                            ? "text-aegean-deep bg-slate-50/80 font-bold border-l-2 border-aegean-sky pl-5"
                                            : "text-aegean-deep/50 hover:text-aegean-deep hover:bg-slate-50/40 border-l-2 border-transparent"
                                    )}
                                >
                                    <Icon className={cn(
                                        "w-4 h-4 transition-colors",
                                        isActive ? "text-aegean-sky" : "text-aegean-deep/40 group-hover:text-aegean-deep"
                                    )} />
                                    <span>{tab.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Lower Section: User Identity / Logout Action */}
                <div className="p-8 border-t border-aegean-mist/40 bg-slate-50/40 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-aegean-deep/80 tracking-wider">GEORGIOS Z.</span>
                        <span className="text-[9px] text-aegean-sky tracking-widest uppercase">Property Owner</span>
                    </div>
                    <Link
                        href={`/login`}
                        className="text-[10px] font-bold tracking-widest uppercase text-red-500/70 hover:text-red-500 transition-colors"
                    >
                        Exit
                    </Link>
                </div>
            </aside>

            {/* 🎯 Main Workspace Wrapper */}
            <div className="flex-1 min-w-0 overflow-y-auto">
                <div className="p-0">
                    {children}
                </div>
            </div>
        </div>
    );
}