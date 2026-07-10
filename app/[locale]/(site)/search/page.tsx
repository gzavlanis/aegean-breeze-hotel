import React from "react";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";

interface SearchPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ checkIn?: string; checkOut?: string; guests?: string }>;
}

export default async function SearchResultsPage({ params, searchParams }: SearchPageProps) {
    const { locale } = await params;
    const { checkIn, checkOut, guests } = await searchParams;

    const t = await getTranslations("SearchPage");
    const tRooms = await getTranslations("Rooms");

    const startDate = checkIn ? new Date(checkIn) : null;
    const endDate = checkOut ? new Date(checkOut) : null;
    const guestCount = guests ? parseInt(guests, 10) : 1;

    let availableRooms: any[] = [];

    if (startDate && endDate && !isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        availableRooms = await prisma.room.findMany({
            where: {
                maxGuests: { gte: guestCount },
                NOT: {
                    bookings: {
                        some: {
                            status: { not: "CANCELLED" },
                            OR: [
                                {
                                    checkIn: { lte: endDate },
                                    checkOut: { gte: startDate }
                                }
                            ]
                        }
                    }
                }
            },
            orderBy: { basePrice: "asc" }
        });
    }

    const nights = startDate && endDate
        ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    return (
        <main className="min-h-screen bg-[#FAF9F6] text-aegean-deep pb-24">

            {/* 🌅 Full Luxury Image Hero Banner (Εναρμονισμένο με το υπόλοιπο site) */}
            <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center bg-aegean-deep overflow-hidden">
                {/* Background Image Asset */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop"
                        alt="Aegean Resort Availability Banner"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Elegant Overlay για μέγιστο contrast με τον Header και τα κείμενα */}
                    <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px]" />
                </div>

                {/* Hero Text Content */}
                <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-12 text-center md:text-left space-y-4 pt-12">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/80 block">
                        {t("subTitle")}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-light uppercase tracking-tight text-white leading-tight">
                        {t("title")}
                    </h1>

                    {startDate && endDate && (
                        <div className="pt-2">
                            <p className="text-[11px] font-mono text-white uppercase tracking-wider bg-aegean-deep/60 backdrop-blur-md inline-block px-4 py-2.5 border border-white/20 shadow-lg">
                                {startDate.toLocaleDateString(locale)} — {endDate.toLocaleDateString(locale)} ({nights} {nights === 1 ? t("night") : t("nights")}) • {guestCount} {guestCount === 1 ? t("guest") : t("guests")}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* 🛏️ Rooms Results Grid Section */}
            <section className="max-w-6xl mx-auto px-6 md:px-12 mt-16 space-y-12">
                <div className="grid grid-cols-1 gap-12">
                    {availableRooms.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-aegean-mist bg-white shadow-sm space-y-4">
                            <p className="text-sm font-light italic text-aegean-sky">
                                {t("noResults")}
                            </p>
                            <Link
                                href="/"
                                className="inline-block text-xs font-bold uppercase tracking-widest border-b border-aegean-deep pb-1 hover:text-aegean-sky hover:border-aegean-sky transition-colors"
                            >
                                {t("modifySearch")}
                            </Link>
                        </div>
                    ) : (
                        availableRooms.map((room) => {
                            const totalPrice = Number(room.basePrice) * nights;

                            return (
                                <div
                                    key={room.id}
                                    className="bg-white border border-aegean-mist/60 grid grid-cols-1 md:grid-cols-3 shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
                                >
                                    {/* Image Asset Side */}
                                    <div className="relative h-64 md:h-full min-h-[240px] overflow-hidden">
                                        <Image
                                            src={room.mainImage}
                                            alt={room.slug}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            sizes="(max-w-7xl) 33vw, 100vw"
                                        />
                                    </div>

                                    {/* Content Info Side */}
                                    <div className="p-8 md:col-span-2 flex flex-col justify-between space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-start gap-4">
                                                <h2 className="text-xl font-light uppercase tracking-tight">
                                                    {tRooms(room.nameKey)}
                                                </h2>
                                                <div className="text-right font-mono">
                                                    <span className="text-xs text-aegean-sky block uppercase tracking-wider">{t("perNight")}</span>
                                                    <span className="text-lg font-medium text-aegean-deep">€{Number(room.basePrice)}</span>
                                                </div>
                                            </div>
                                            <p className="text-xs font-light text-aegean-deep/70 leading-relaxed max-w-xl">
                                                {tRooms(room.descKey)}
                                            </p>

                                            {/* Room Mini Specs */}
                                            <div className="flex gap-6 text-[10px] font-bold tracking-widest uppercase text-aegean-sky pt-2">
                                                <span>{room.sqMeters} M²</span>
                                                <span>•</span>
                                                <span>Max {room.maxGuests} {t("guests")}</span>
                                            </div>
                                        </div>

                                        {/* Pricing Action Area */}
                                        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div>
                                                <span className="text-[10px] text-aegean-sky block font-bold uppercase tracking-wider">{t("totalStay")}</span>
                                                <span className="text-2xl font-light font-mono text-emerald-700">€{totalPrice.toLocaleString(locale)}</span>
                                            </div>
                                            <Link
                                                href={`/rooms/${room.slug}?checkIn=${checkIn}&checkOut=${checkOut}`}
                                                className="bg-aegean-deep hover:bg-neutral-800 text-white text-center py-3 px-8 text-xs font-bold uppercase tracking-[0.2em] transition-colors"
                                            >
                                                {t("bookButton")}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>
        </main>
    );
}