"use client";

import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import RoomCard from "./RoomCard";

const mockRooms = [
    {
        id: 1,
        title: "Aegean Double Room",
        price: 180,
        image: "https://images.unsplash.com/photo-1582719478250-c89404bb8a0e?q=80&w=1000&auto=format&fit=crop",
        size: "25",
        guests: 2,
        bedType: "Queen Size",
        amenities: ["wifi", "ac", "tv", "coffee"],
    },
    {
        id: 2,
        title: "Minimalist Sea View Suite",
        price: 320,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format&fit=crop",
        size: "45",
        guests: 3,
        bedType: "King Size",
        amenities: ["wifi", "ac", "tv", "coffee", "pool"],
    },
    {
        id: 3,
        title: "Luxury Pool Villa",
        price: 550,
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop",
        size: "80",
        guests: 4,
        bedType: "2x King Size",
        amenities: ["wifi", "ac", "tv", "coffee", "pool", "parking"],
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    },
};

export default function RoomsGrid() {
    const t = useTranslations("Rooms");

    return (
        <section className="py-24 bg-aegean-white px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-light tracking-tight text-aegean-deep uppercase mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-aegean-deep/70 max-w-2xl mx-auto text-sm">
                        {t('subtitle')}
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {mockRooms.map((room) => (
                        <motion.div key={room.id} variants={itemVariants} className="h-full">
                            <RoomCard
                                title={room.title}
                                price={room.price}
                                image={room.image}
                                size={room.size}
                                guests={room.guests}
                                bedType={room.bedType}
                                amenities={room.amenities}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}