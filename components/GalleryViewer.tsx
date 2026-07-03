"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight, IconClose } from "@/components/AegeanIcons";

// Premium φωτογραφικό υλικό χωρισμένο σε κατηγορίες (για πλούσιο layout)
const galleryImages = [
    { id: 0, src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200", aspect: "aspect-video" },
    { id: 1, src: "https://images.unsplash.com/photo-1582719478250-c89404bb8a0e?q=80&w=1200", aspect: "aspect-square" },
    { id: 2, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200", aspect: "aspect-[3/4]" },
    { id: 3, src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200", aspect: "aspect-square" },
    { id: 4, src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200", aspect: "aspect-video" },
    { id: 5, src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200", aspect: "aspect-[4/3]" },
    { id: 6, src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200", aspect: "aspect-[3/4]" },
    { id: 7, src: "https://images.unsplash.com/photo-1515260268569-9271009adfdb?q=80&w=1200", aspect: "aspect-video" },
    { id: 8, src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200", aspect: "aspect-square" }
];

export default function GalleryViewer() {
    const [index, setIndex] = useState<number | null>(null);

    // Συναρτήσεις πλοήγησης τυλιγμένες σε useCallback για βελτιστοποίηση
    const showNext = useCallback(() => {
        setIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
    }, []);

    const showPrev = useCallback(() => {
        setIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
    }, []);

    const handleClose = useCallback(() => {
        setIndex(null);
    }, []);

    // Keyboard Listeners για Escape, ArrowRight και ArrowLeft
    useEffect(() => {
        if (index === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [index, showNext, showPrev, handleClose]);

    return (
        <div className="max-w-7xl mx-auto px-6">

            {/* 1. Masonry Grid Architecture */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {galleryImages.map((img) => (
                    <div
                        key={img.id}
                        onClick={() => setIndex(img.id)}
                        className="break-inside-avoid relative overflow-hidden bg-aegean-deep border border-aegean-mist group cursor-none"
                    >
                        <img
                            src={img.src}
                            alt={`Aethra visual frame ${img.id}`}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103 opacity-95 group-hover:opacity-100"
                        />

                        {/* Elegant Minimal Overlay Hover Effect */}
                        <div className="absolute inset-0 bg-aegean-deep/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase bg-aegean-deep/80 px-4 py-2 border border-white/20">
                VIEW FRAME
              </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. Full-Screen Luxury Lightbox Modal */}
            <AnimatePresence>
                {index !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-[100] bg-aegean-deep/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 select-none"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 z-[110] text-white/60 hover:text-white transition-colors p-2"
                        >
                            <IconClose className="w-6 h-6" />
                        </button>

                        {/* Left Nav Arrow */}
                        <button
                            onClick={(e) => { e.stopPropagation(); showPrev(); }}
                            className="absolute left-4 md:left-8 z-[110] text-white/40 hover:text-white transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-none border border-white/10"
                        >
                            <IconArrowLeft className="w-5 h-5" />
                        </button>

                        {/* Main Image Stage */}
                        <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={index}
                                    src={galleryImages[index].src}
                                    alt="Aethra focused perspective"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    onClick={(e) => e.stopPropagation()} // Αποτρέπει το κλείσιμο όταν πατάμε πάνω στην εικόνα
                                    className="max-w-full max-h-[80vh] object-contain border border-white/10 shadow-2xl"
                                />
                            </AnimatePresence>
                        </div>

                        {/* Right Nav Arrow */}
                        <button
                            onClick={(e) => { e.stopPropagation(); showNext(); }}
                            className="absolute right-4 md:right-8 z-[110] text-white/40 hover:text-white transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-none border border-white/10"
                        >
                            <IconArrowRight className="w-5 h-5" />
                        </button>

                        {/* Image Counter Badge */}
                        <div className="absolute bottom-6 text-[10px] font-bold tracking-widest text-white/50 uppercase">
                            {index + 1} / {galleryImages.length}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}