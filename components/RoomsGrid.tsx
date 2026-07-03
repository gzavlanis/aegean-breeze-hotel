"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { IconArrowRight } from "./AegeanIcons";

const mockRooms = [
    {
        slug: "junior-suite-sea-view",
        category: "suite",
        price: 180,
        guests: 2,
        size: "35m²",
        image: "https://images.unsplash.com/photo-1582719478250-c89404bb8a0e?q=80&w=1000&auto=format&fit=crop",
        amenities: ["amenity_wifi", "amenity_ac", "amenity_coffee", "amenity_tv"],
        featured: true // Εμφανίζεται στην Home
    },
    {
        slug: "aegean-executive-suite",
        category: "suite",
        price: 320,
        guests: 3,
        size: "55m²",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format&fit=crop",
        amenities: ["amenity_wifi", "amenity_ac", "amenity_pool", "amenity_coffee", "amenity_tv"],
        featured: true // Εμφανίζεται στην Home
    },
    {
        slug: "aethra-infinity-villa",
        category: "villa",
        price: 650,
        guests: 5,
        size: "120m²",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
        amenities: ["amenity_wifi", "amenity_ac", "amenity_pool", "amenity_coffee", "amenity_tv", "amenity_parking"],
        featured: true // Εμφανίζεται στην Home
    },
    {
        slug: "honeymoon-private-pool-suite",
        category: "suite",
        price: 450,
        guests: 2,
        size: "60m²",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop",
        amenities: ["amenity_wifi", "amenity_ac", "amenity_pool", "amenity_coffee", "amenity_tv"],
        featured: false
    },
    {
        slug: "grand-cycladic-villa",
        category: "villa",
        price: 890,
        guests: 6,
        size: "160m²",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
        amenities: ["amenity_wifi", "amenity_ac", "amenity_pool", "amenity_coffee", "amenity_tv", "amenity_parking"],
        featured: false
    }
];

interface RoomsGridProps {
    teaser?: boolean;
}

export default function RoomsGrid({ teaser = false }: RoomsGridProps) {
    const t = useTranslations("Rooms");
    const [activeFilter, setActiveFilter] = useState("all");

    // Αν είμαστε στην Home, δείχνουμε μόνο τα featured. Αν είμαστε στη σελίδα Rooms, φιλτράρουμε με βάση το tab.
    const filteredRooms = mockRooms.filter(room => {
        if (teaser) return room.featured;
        if (activeFilter === "all") return true;
        return room.category === activeFilter;
    });

    // --- ΑΝ ΕΙΜΑΣΤΕ ΣΤΗΝ HOME (COMPACT TEASER GRID) ---
    if (teaser) {
        return (
            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredRooms.map((room) => (
                    <div key={room.slug} className="bg-white border border-aegean-mist group flex flex-col justify-between shadow-sm">
                        <div className="relative h-[35vh] overflow-hidden bg-aegean-deep">
                            <img src={room.image} alt={room.slug} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute top-3 right-3 bg-aegean-deep text-white px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase">
                                {t("from")} €{room.price}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="text-[10px] font-medium text-aegean-sky uppercase tracking-wider mb-2">{room.size} • {room.guests} {t("guests_label")}</div>
                            <h3 className="text-xl font-light text-aegean-deep uppercase tracking-tight mb-4">{room.slug.replace(/-/g, " ")}</h3>
                            <Link href={`/rooms/${room.slug}`} className="group/btn flex items-center justify-between border-t border-aegean-mist pt-3 text-[11px] font-bold tracking-widest uppercase text-aegean-deep hover:text-aegean-sky transition-colors">
                                <span>{t("view_details")}</span>
                                <IconArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // --- ΑΝ ΕΙΜΑΣΤΕ ΣΤΗ ΣΕΛΙΔΑ ROOMS (PREMIUM EDITORIAL ALTERNATING LAYOUT) ---
    return (
        <div className="max-w-7xl mx-auto px-6 mt-12">

            {/* Category Filter Tabs */}
            <div className="flex justify-center md:justify-start gap-8 mb-20 border-b border-aegean-mist pb-4 text-xs font-bold uppercase tracking-widest">
                {["all", "suite", "villa"].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`pb-4 transition-colors relative ${activeFilter === filter ? "text-aegean-sky" : "text-aegean-deep/50 hover:text-aegean-deep"}`}
                    >
                        {filter === "all" ? "ALL ACCOMMODATIONS" : filter + "S"}
                        {activeFilter === filter && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[2px] bg-aegean-sky" />}
                    </button>
                ))}
            </div>

            {/* Alternating Editorial List */}
            <div className="flex flex-col gap-24 md:gap-36">
                <AnimatePresence mode="popLayout">
                    {filteredRooms.map((room, index) => {
                        const isEven = index % 2 !== 0;

                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1] }}
                                key={room.slug}
                                className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-20`}
                            >
                                {/* Image Side with Scale-on-Hover Viewport */}
                                <div className="w-full md:w-3/5 relative group overflow-hidden border border-aegean-mist">
                                    <div className="relative h-[50vh] md:h-[55vh] min-h-[350px] overflow-hidden">
                                        <img
                                            src={room.image}
                                            alt={room.slug}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute bottom-6 left-6 bg-white border border-aegean-mist text-aegean-deep px-5 py-3 text-xs font-bold tracking-widest uppercase">
                                        {t("from")} €{room.price} <span className="text-[10px] text-aegean-deep/50 font-normal">/ {t("per_night")}</span>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-2/5 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 text-[11px] font-bold text-aegean-sky uppercase tracking-widest mb-4">
                                        <span>{room.size}</span>
                                        <span className="w-1.5 h-1.5 bg-aegean-sky/30 rotate-45" />
                                        <span>{room.guests} {t("guests_label")}</span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-light text-aegean-deep uppercase tracking-tight mb-6 leading-tight">
                                        {room.slug.replace(/-/g, " ")}
                                    </h3>

                                    {/* Grid of Clean Amenities */}
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-b border-aegean-mist/60 py-6 mb-8">
                                        {room.amenities.map((amenity) => (
                                            <span key={amenity} className="text-xs text-aegean-deep/70 font-light flex items-center gap-2">
                        <span className="w-1 h-1 bg-aegean-sky rounded-full" />
                                                {t(amenity)}
                      </span>
                                        ))}
                                    </div>

                                    {/* Call To Action Button */}
                                    <Link
                                        href={`/rooms/${room.slug}`}
                                        className="group/btn flex items-center gap-4 text-aegean-deep font-bold tracking-widest uppercase text-xs w-max"
                                    >
                    <span className="border-b border-transparent group-hover/btn:border-aegean-deep transition-colors pb-1">
                      {t("view_details")}
                    </span>
                                        <IconArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}