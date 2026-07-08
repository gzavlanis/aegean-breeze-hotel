import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import BookingForm from "@/components/BookingForm";
import { prisma } from "@/lib/prisma";
import {
    IconWifi, IconAC, IconPool, IconCoffee, IconTV, IconCar, IconGuests, IconSquareMeters, IconBed
} from "@/components/AegeanIcons";
import React from "react";

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    amenity_pool: IconPool,
    amenity_wifi: IconWifi,
    amenity_ac: IconAC,
    amenity_coffee: IconCoffee,
    amenity_tv: IconTV,
    amenity_parking: IconCar,
};

interface RoomPageProps {
    params: Promise<{ slug: string; locale: string }>;
}

export default async function RoomDetailPage({ params }: RoomPageProps) {
    const { slug } = await params;

    const room = await prisma.room.findUnique({
        where: { slug: slug }
    });

    if (!room) notFound();

    const t = await getTranslations("Rooms");
    const parsedAmenities: string[] = typeof room.amenities === "string" ? JSON.parse(room.amenities) : (room.amenities as string[]);
    const parsedGallery: string[] = typeof room.images === "string" ? JSON.parse(room.images) : (room.images as string[]);
    const roomName = t(room.nameKey);

    return (
        <main className="min-h-screen bg-[#FAF9F6] text-aegean-deep selection:bg-aegean-sky selection:text-white">

            {/* 1. Immersive Editorial Room Hero */}
            <section className="relative h-[80vh] min-h-[600px] flex items-end justify-start overflow-hidden bg-aegean-deep">
                <img
                    src={room.mainImage}
                    alt={roomName}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-black/20 to-black/40" />

                <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 grid grid-cols-1 md:grid-cols-2 items-end gap-8">
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aegean-sky block">
                            {room.slug.includes("villa") ? "VILLA" : "SUITE"} SANCTUARY
                        </span>
                        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white uppercase leading-tight">
                            {roomName}
                        </h1>
                    </div>

                    {/* Quick Specs Strip inside Hero */}
                    <div className="flex flex-wrap md:justify-end gap-6 text-white border-t border-white/20 pt-6 md:border-t-0 md:pt-0">
                        <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-3 border border-white/10">
                            <IconSquareMeters className="w-4 h-4 text-aegean-sky" />
                            <span className="text-xs tracking-wider uppercase font-medium">{room.sqMeters} m²</span>
                        </div>
                        <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-3 border border-white/10">
                            <IconGuests className="w-4 h-4 text-aegean-sky" />
                            <span className="text-xs tracking-wider uppercase font-medium">{room.maxGuests} {t("guests_label")}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Main Content Layout Split */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column (8 Columns Wide) */}
                    <div className="lg:col-span-7 space-y-16">

                        {/* Narrative & Description */}
                        <div className="space-y-6">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aegean-sky block">THE ARCHITECTURE OF STILLNESS</span>
                            <p className="text-aegean-deep/80 font-light text-base md:text-lg leading-relaxed first-letter:text-4xl first-letter:font-light first-letter:mr-3 first-letter:float-left">
                                {t(room.descKey)}
                            </p>
                        </div>

                        {/* Integrated Luxury Amenities Block */}
                        <div className="border-t border-aegean-mist/60 pt-12">
                            <h3 className="text-xs font-bold tracking-widest text-aegean-deep uppercase mb-8">
                                Refined In-Room Comforts
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {parsedAmenities.map((amenityKey: string) => {
                                    const IconComponent = amenityIcons[amenityKey];
                                    return (
                                        <div key={amenityKey} className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 border border-aegean-mist/80 flex items-center justify-center text-aegean-deep/60 bg-white group-hover:border-aegean-sky group-hover:text-aegean-sky transition-colors duration-300">
                                                {IconComponent ? <IconComponent className="w-4 h-4" /> : <IconBed className="w-4 h-4" />}
                                            </div>
                                            <span className="text-xs uppercase tracking-widest font-medium text-aegean-deep/80">
                                                {t(amenityKey, { defaultMessage: amenityKey.replace(/amenity_/g, "").replace(/_/g, " ") })}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column / Sticky Booking Form (5 Columns Wide) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <div className="bg-white border border-aegean-mist/80 p-8 shadow-sm">
                            <div className="flex justify-between items-baseline border-b border-aegean-mist pb-4 mb-6">
                                <span className="text-xs font-bold uppercase tracking-widest text-aegean-deep/60">Exclusive Rate</span>
                                <div className="text-right">
                                    <span className="text-2xl font-light text-aegean-deep">€{Number(room.basePrice)}</span>
                                    <span className="text-[10px] text-aegean-deep/50 font-light block">/ {t("per_night")}</span>
                                </div>
                            </div>
                            <BookingForm
                                roomId={room.id}
                                basePrice={Number(room.basePrice)}
                                maxGuests={room.maxGuests}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Asymmetric Editorial Architectural Gallery */}
            <section className="bg-white border-t border-b border-aegean-mist/60 py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center md:text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aegean-sky mb-2 block">
                            VISUAL CHRONICLES
                        </span>
                        <h2 className="text-3xl font-light text-aegean-deep uppercase tracking-tight">
                            INSIDE THE {roomName}
                        </h2>
                    </div>

                    {/* Asymmetric Mosaic Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {parsedGallery[0] && (
                            <div className="md:col-span-7 h-[55vh] min-h-[350px] overflow-hidden border border-aegean-mist bg-[#FAF9F6]">
                                <img
                                    src={parsedGallery[0]}
                                    alt={`${roomName} structural detail`}
                                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-1000 ease-out"
                                />
                            </div>
                        )}
                        <div className="md:col-span-5 flex flex-col gap-8">
                            {parsedGallery.slice(1, 3).map((imgUrl: string, idx: number) => (
                                <div key={idx} className="h-[25vh] min-h-[160px] overflow-hidden border border-aegean-mist bg-[#FAF9F6]">
                                    <img
                                        src={imgUrl}
                                        alt={`${roomName} interior view ${idx + 2}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <ContactSection />
        </main>
    );
}