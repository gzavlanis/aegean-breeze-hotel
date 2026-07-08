"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { IconArrowRight } from "./AegeanIcons";

interface RoomItem {
    id: number;
    slug: string;
    nameKey: string;
    descKey: string;
    basePrice: number | string;
    maxGuests: number;
    sqMeters: number;
    amenities: string[] | string;
    mainImage: string;
}

interface RoomsGridProps {
    teaser?: boolean;
}

export default function RoomsGrid({ teaser = false }: RoomsGridProps) {
    const t = useTranslations("Rooms");
    const [rooms, setRooms] = useState<RoomItem[]>([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/rooms")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setRooms(data);
                } else {
                    console.error("API didn't return an array:", data);
                    setRooms([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading live suites:", err);
                setRooms([]);
                setLoading(false);
            });
    }, []);

    const filteredRooms = (Array.isArray(rooms) ? rooms : []).filter((room) => {
        if (teaser) return true;
        if (activeFilter === "all") return true;
        return room.slug?.includes(activeFilter);
    });

    const displayedRooms = teaser ? filteredRooms.slice(0, 3) : filteredRooms;

    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center text-aegean-sky tracking-widest text-xs uppercase font-bold">
                Unveiling Luxury Accommodations...
            </div>
        );
    }

    if (teaser) {
        return (
            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {displayedRooms.map((room) => (
                    <div key={room.id} className="bg-white border border-aegean-mist group flex flex-col justify-between shadow-sm">
                        <div className="relative h-[35vh] overflow-hidden bg-aegean-deep">
                            <img src={room.mainImage} alt={t(room.nameKey)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute top-3 right-3 bg-aegean-deep text-white px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase">
                                {t("from")} €{Number(room.basePrice)}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="text-[10px] font-medium text-aegean-sky uppercase tracking-wider mb-2">
                                {room.sqMeters}m² • {room.maxGuests} {t("guests_label")}
                            </div>
                            <h3 className="text-xl font-light text-aegean-deep uppercase tracking-tight mb-4">
                                {t(room.nameKey)}
                            </h3>
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
                    {displayedRooms.map((room, index) => {
                        const isEven = index % 2 !== 0;
                        const cleanAmenities: string[] = typeof room.amenities === "string"
                            ? JSON.parse(room.amenities)
                            : Array.isArray(room.amenities) ? room.amenities : [];

                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1] }}
                                key={room.id}
                                className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-20`}
                            >
                                {/* Image Side */}
                                <div className="w-full md:w-3/5 relative group overflow-hidden border border-aegean-mist">
                                    <div className="relative h-[50vh] md:h-[55vh] min-h-[350px] overflow-hidden">
                                        <img
                                            src={room.mainImage}
                                            alt={t(room.nameKey)}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute bottom-6 left-6 bg-white border border-aegean-mist text-aegean-deep px-5 py-3 text-xs font-bold tracking-widest uppercase">
                                        {t("from")} €{Number(room.basePrice)} <span className="text-[10px] text-aegean-deep/50 font-normal">/ {t("per_night")}</span>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-2/5 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 text-[11px] font-bold text-aegean-sky uppercase tracking-widest mb-4">
                                        <span>{room.sqMeters}m²</span>
                                        <span className="w-1.5 h-1.5 bg-aegean-sky/30 rotate-45" />
                                        <span>{room.maxGuests} {t("guests_label")}</span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-light text-aegean-deep uppercase tracking-tight mb-6 leading-tight">
                                        {t(room.nameKey)}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-b border-aegean-mist/60 py-6 mb-8">
                                        {cleanAmenities.map((amenity) => (
                                            <span key={amenity} className="text-xs text-aegean-deep/70 font-light flex items-center gap-2">
                                                <span className="w-1 h-1 bg-aegean-sky rounded-full" />
                                                {t(amenity)}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Button */}
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