"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
    IconGuests, IconSquareMeters, IconBed,
    IconWifi, IconAC, IconPool, IconCoffee, IconTV, IconCar,
    IconArrowRight
} from "./AegeanIcons";

interface RoomCardProps {
    title: string;
    price: number;
    image: string;
    size: string;
    guests: number;
    bedType: string;
    amenities: string[];
}

const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <IconWifi className="text-aegean-sky" />,
    ac: <IconAC className="text-aegean-sky" />,
    pool: <IconPool className="text-aegean-sky" />,
    coffee: <IconCoffee className="text-aegean-sky" />,
    tv: <IconTV className="text-aegean-sky" />,
    parking: <IconCar className="text-aegean-sky" />,
};

export default function RoomCard({ title, price, image, size, guests, bedType, amenities = [], }: RoomCardProps) {
    const t = useTranslations("Rooms");
    const [isHovered, setIsHovered] = useState(false);
    const displayAmenities = amenities.slice(0, 4);

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative overflow-hidden bg-white border border-aegean-mist transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,53,128,0.1)] h-full flex flex-col justify-between rounded-none"
        >
            <div className="relative h-[280px] overflow-hidden flex-shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aegean-deep/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 z-20 bg-aegean-deep text-white px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-none shadow-sm">
                    {t('from')} €{price}
                </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-light tracking-tight text-aegean-deep uppercase mb-6 group-hover:text-aegean-sky transition-colors">
                    {title}
                </h3>
                <motion.div
                    animate={isHovered ? "show" : "hidden"}
                    variants={{ hidden: { height: 0, opacity: 0 }, show: { height: "auto", opacity: 1 } }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden"
                >
                    <div className="space-y-4 mb-8 text-aegean-deep/80 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="border border-aegean-mist p-1.5 rounded-none"><IconGuests className="text-aegean-sky" /></div>
                            <span className="font-medium">{guests} {t('guests_label')}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="border border-aegean-mist p-1.5 rounded-none"><IconSquareMeters className="text-aegean-sky" /></div>
                            <span className="font-medium">{size} m²</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="border border-aegean-mist p-1.5 rounded-none"><IconBed className="text-aegean-sky" /></div>
                            <span className="font-medium uppercase tracking-tighter text-xs">{bedType}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-aegean-mist pt-6 mt-6">
                        <div className="flex items-center gap-2">
                            {displayAmenities.map((amenityKey) => {
                                const icon = amenityIcons[amenityKey];
                                if (!icon) return null;

                                return (
                                    <div key={amenityKey} className="border border-aegean-mist p-1.5 rounded-none relative group/tooltip hover:border-aegean-sky transition-colors cursor-help bg-white">
                                        {icon}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-aegean-deep text-white text-[10px] px-2 py-1 rounded-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg">
                                            {t(`amenity_${amenityKey}`)}
                                        </div>
                                    </div>
                                );
                            })}
                            {amenities.length > 4 && (
                                <div className="text-[10px] font-bold text-aegean-sky ml-1 px-1">
                                    +{amenities.length - 4}
                                </div>
                            )}
                        </div>

                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="group/btn flex items-center gap-2 text-aegean-deep font-bold tracking-widest uppercase text-[11px] bg-aegean-white p-3 rounded-none hover:bg-aegean-deep hover:text-white transition-all ml-auto"
                        >
                            <span>{t('view_details')}</span>
                            <IconArrowRight className="w-4 h-4 text-currentColor group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}