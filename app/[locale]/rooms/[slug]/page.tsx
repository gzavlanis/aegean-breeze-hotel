import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import BookingForm from "@/components/BookingForm";
import { prisma } from "@/lib/prisma";
import {
    IconWifi, IconAC, IconPool, IconCoffee, IconTV, IconCar
} from "@/components/AegeanIcons";
import React from "react";

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    private_pool: IconPool,
    infinity_pool: IconPool,
    private_infinity_pool: IconPool,
    outdoor_jacuzzi: IconPool,
    wifi: IconWifi,
    king_bed: IconCoffee,
    sea_view: IconCar,
    caldera_view: IconCar,
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
        <main className="min-h-screen bg-aegean-white">

            {/* 1. Full-Screen Room Hero */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-aegean-deep">
                <img
                    src={room.mainImage}
                    alt={roomName}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-aegean-white" />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-20">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aegean-sky mb-4 block">
                        {room.slug.includes("villa") ? "VILLA" : "SUITE"} SPECIFICATION
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
                        <div>{t("guests_label")}: <span className="font-light text-aegean-deep/70">{room.maxGuests} Guests</span></div>
                        <div className="w-1 h-1 bg-aegean-mist rounded-full" />
                        <div>Size: <span className="font-light text-aegean-deep/70">{room.sqMeters}m²</span></div>
                        <div className="w-1 h-1 bg-aegean-mist rounded-full" />
                        <div>Rate: <span className="font-light text-aegean-deep/70">From €{Number(room.basePrice)} / {t("per_night")}</span></div>
                    </div>

                    <div className="space-y-6 text-aegean-deep/80 font-light text-sm md:text-base leading-relaxed">
                        <p>{t(room.descKey)}</p>
                    </div>

                    {/* Move Amenities list here to free up the right sidebar for the Booking Widget */}
                    <div className="pt-8">
                        <h3 className="text-xs font-bold tracking-widest text-aegean-deep uppercase mb-6 pb-4 border-b border-aegean-mist">
                            ROOM AMENITIES
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {parsedAmenities.map((amenityKey: string) => {
                                const IconComponent = amenityIcons[amenityKey];
                                return (
                                    <div key={amenityKey} className="flex items-center gap-4 text-xs uppercase tracking-wider font-medium text-aegean-deep/80">
                                        <div className="w-8 h-8 rounded-none border border-aegean-mist flex items-center justify-center text-aegean-sky bg-aegean-white">
                                            {IconComponent && <IconComponent className="w-4 h-4" />}
                                        </div>
                                        <span>{t(amenityKey, { defaultMessage: amenityKey.replace(/_/g, " ") })}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="h-max">
                    <BookingForm
                        roomId={room.id}
                        basePrice={Number(room.basePrice)}
                        maxGuests={room.maxGuests}
                    />
                </div>
            </section>

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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {parsedGallery.map((imgUrl: string, idx: number) => (
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

            <ContactSection />
        </main>
    );
}