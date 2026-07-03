"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { IconArrowRight, IconGuests } from "./AegeanIcons";

// --- SLIDESHOW IMAGES DATA ---
const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1570051730005-eb35508c4050?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=2000&auto=format&fit=crop",
    },
];

export default function Hero() {
    const t = useTranslations("Hero");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(2);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-aegean-deep">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[currentSlide].id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={slides[currentSlide].image}
                        alt="Aethra Aegean Resort Scene"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-aegean-deep/20" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 mb-20 md:mb-0">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-xs font-bold uppercase tracking-[0.5em] mb-6 shadow-sm"
                >
                    {t('welcome')}
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter uppercase mb-12 max-w-5xl leading-tight"
                >
                    {t.rich('tagline', {
                        br: () => <br />,
                        italic: (chunks) => <span className="italic font-serif">{chunks}</span>
                    })}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col md:flex-row items-center gap-6"
                >
                    <div className="bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-aegean-deep rounded-none shadow-md">
                        {t('starting_from')}
                    </div>

                    <Link href="/book" className="group flex items-center gap-3 text-white font-bold tracking-widest uppercase text-xs">
                        <span>{t('book_now')}</span>
                        <div className="border border-white/30 p-2.5 rounded-none group-hover:bg-aegean-deep group-hover:text-white group-hover:border-aegean-deep transition-all">
                            <IconArrowRight className="w-4 h-4 text-currentColor" />
                        </div>
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-20"
            >
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="bg-aegean-white p-6 grid grid-cols-2 md:grid-cols-4 items-center gap-4 md:gap-0 divide-aegean-mist border border-aegean-mist md:divide-x rounded-none shadow-2xl"
                >
                    <div className="flex flex-col gap-2 px-0 md:px-6">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky">{t('check_in')}</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none text-sm text-aegean-deep rounded-none px-0"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2 px-0 md:px-6">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky">{t('check_out')}</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none text-sm text-aegean-deep rounded-none px-0"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2 px-0 md:px-6">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky flex items-center gap-2">
                            <IconGuests className="w-3 h-3 text-aegean-sky" />
                            {t('guests')}
                        </label>
                        <select
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className="bg-transparent border-b border-aegean-mist focus:border-aegean-deep outline-none text-sm text-aegean-deep rounded-none px-0 appearance-none cursor-pointer"
                        >
                            {[1, 2, 3, 4, 5, 6].map((g) => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2 md:col-span-1 flex items-center justify-center md:h-full md:px-6">
                        <button
                            type="submit"
                            className="w-full h-full bg-aegean-deep text-white text-xs font-bold uppercase tracking-widest py-4 md:py-0 md:h-16 flex items-center justify-center gap-3 rounded-none hover:bg-aegean-sky transition-colors active:scale-95 shadow-md"
                        >
                            <span>{t('check_availability')}</span>
                            <IconArrowRight className="w-4 h-4 text-white" />
                        </button>
                    </div>

                </form>
            </motion.div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-white/40 text-[9px] uppercase tracking-widest font-light">SCROLL</span>
                <div className="w-[1px] h-12 bg-white/20 animate-scroll-line" />
            </div>

        </section>
    );
}