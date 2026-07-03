import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import {
    IconWifi, IconAC, IconPool, IconCoffee, IconTV, IconCar
} from "@/components/AegeanIcons";
import React from "react";

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    amenity_wifi: IconWifi,
    amenity_ac: IconAC,
    amenity_pool: IconPool,
    amenity_coffee: IconCoffee,
    amenity_tv: IconTV,
    amenity_parking: IconCar,
};

interface RoomData {
    category: "suite" | "villa";
    price: number;
    guests: number;
    size: string;
    heroImage: string;
    amenities: string[];
    gallery: string[];
}

const roomsData: Record<string, RoomData> = {
    "junior-suite-sea-view": {
        category: "suite",
        price: 180,
        guests: 2,
        size: "35m²",
        heroImage: "https://images.unsplash.com/photo-1582719478250-c89404bb8a0e?q=80&w=2000&auto=format&fit=crop",
        amenities: ["amenity_wifi", "amenity_ac", "amenity_coffee", "amenity_tv"],
        gallery: [
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
            "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000"
        ]
    },
    "aegean-executive-suite": {
        category: "suite",
        price: 320,
        guests: 3,
        size: "55m²",
        heroImage: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2000&auto=format&fit=crop",
        amenities: ["amenity_wifi", "amenity_ac", "amenity_pool", "amenity_coffee", "amenity_tv"],
        gallery: [
            "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000",
            "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1000"
        ]
    },
    "aethra-infinity-villa": {
        category: "villa",
        price: 650,
        guests: 5,
        size: "120m²",
        heroImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop",
        amenities: ["amenity_wifi", "amenity_ac", "amenity_pool", "amenity_coffee", "amenity_tv", "amenity_parking"],
        gallery: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1000",
            "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=1000",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000"
        ]
    },
    "honeymoon-private-pool-suite": {
        category: "suite",
        price: 450,
        guests: 2,
        size: "60m²",
        heroImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2000&auto=format&fit=crop",
        amenities: ["amenity_wifi", "amenity_ac", "amenity_pool", "amenity_coffee", "amenity_tv"],
        gallery: [
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1000",
            "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000"
        ]
    },
    "grand-cycladic-villa": {
        category: "villa",
        price: 890,
        guests: 6,
        size: "160m²",
        heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
        amenities: ["amenity_wifi", "amenity_ac", "amenity_pool", "amenity_coffee", "amenity_tv", "amenity_parking"],
        gallery: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000"
        ]
    }
};

interface RoomPageProps {
    params: Promise<{ slug: string; locale: string }>;
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
    const { slug } = await params;
    const room = roomsData[slug];

    if (!room) notFound();

    const t = await getTranslations("Rooms");
    const roomName = slug.replace(/-/g, " ");

    return (
        <main className="min-h-screen bg-aegean-white">

            {/* 1. Full-Screen Room Hero */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-aegean-deep">
                <img
                    src={room.heroImage}
                    alt={roomName}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-aegean-white" />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aegean-sky mb-4 block">
            {room.category} SPECIFICATION
          </span>
                    <h1 className="text-4xl md:text-7xl font-light tracking-tight text-white uppercase mb-4 leading-tight">
                        {roomName}
                    </h1>
                    <div className="w-16 h-[1px] bg-white/30 mx-auto" />
                </div>
            </section>

            {/* 2. Content & Specifications Block */}
            <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* Left Side: The Editorial Text */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-6 border-b border-aegean-mist pb-6 text-xs font-bold uppercase tracking-widest text-aegean-deep">
                        <div>{t("guests_label")}: <span className="font-light text-aegean-deep/70">{room.guests} Guests</span></div>
                        <div className="w-1 h-1 bg-aegean-mist rounded-full" />
                        <div>Size: <span className="font-light text-aegean-deep/70">{room.size}</span></div>
                        <div className="w-1 h-1 bg-aegean-mist rounded-full" />
                        <div>Rate: <span className="font-light text-aegean-deep/70">From €{room.price} / {t("per_night")}</span></div>
                    </div>

                    <div className="space-y-6 text-aegean-deep/80 font-light text-sm md:text-base leading-relaxed">
                        <p>
                            Experience the absolute refinement of Cycladic architecture seamlessly combined with elite contemporary luxury. Every line of this space has been intentionally crafted to offer an unobstructed dialogue with the dramatic Santorini horizon and the infinite azure of the Aegean Sea.
                        </p>
                        <p>
                            Bathed in pristine organic light, the interiors showcase premium stone craft surfaces, minimalist custom furniture, and raw linen textures that invite absolute stillness. Step outside to your private terrace to discover a masterclass of open-air relaxation, designed to blur the boundaries between architectural geometry and nature.
                        </p>
                    </div>
                </div>

                {/* Right Side: Interactive Amenities Card */}
                <div className="bg-white border border-aegean-mist p-8 h-max shadow-sm">
                    <h3 className="text-xs font-bold tracking-widest text-aegean-deep uppercase mb-6 pb-4 border-b border-aegean-mist">
                        ROOM AMENITIES
                    </h3>
                    <div className="grid grid-cols-1 gap-y-4">
                        {room.amenities.map((amenityKey: string) => {
                            const IconComponent = amenityIcons[amenityKey];
                            return (
                                <div key={amenityKey} className="flex items-center gap-4 text-xs uppercase tracking-wider font-medium text-aegean-deep/80">
                                    <div className="w-8 h-8 rounded-none border border-aegean-mist flex items-center justify-center text-aegean-sky bg-aegean-white">
                                        {IconComponent && <IconComponent className="w-4 h-4" />}
                                    </div>
                                    <span>{t(amenityKey)}</span>
                                </div>
                            );
                        })}
                    </div>

                    <button className="w-full bg-aegean-deep hover:bg-aegean-sky text-white text-[11px] font-bold tracking-widest uppercase py-4 transition-colors mt-8 rounded-none">
                        {t("from")} €{room.price} — BOOK NOW
                    </button>
                </div>
            </section>

            {/* 3. Dedicated Architectural Gallery */}
            <section className="bg-white border-t border-b border-aegean-mist py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky mb-2 block">
              VISUAL EXPLORATION
            </span>
                        <h2 className="text-2xl font-light text-aegean-deep uppercase tracking-tight">
                            INSIDE THE {roomName}
                        </h2>
                    </div>

                    {/* Minimal 3-Column Image Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {room.gallery.map((imgUrl: string, idx: number) => (
                            <div key={idx} className="h-[35vh] min-h-[250px] overflow-hidden border border-aegean-mist bg-aegean-white">
                                <img
                                    src={imgUrl}
                                    alt={`${roomName} gallery view ${idx + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Global Contact Section to finalize intent */}
            <ContactSection />
        </main>
    );
}