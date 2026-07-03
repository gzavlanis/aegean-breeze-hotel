"use client";

import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl"; // <-- Προσθήκη του next-intl

// --- MOCK GALLERY DATA ---
const galleryImages = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
        alt: "Aegean Pool Architecture",
        className: "col-span-2 row-span-2",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1515404929826-76fff9fef6fe?q=80&w=1000&auto=format&fit=crop",
        alt: "Morning Details",
        className: "col-span-1 row-span-1",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1000&auto=format&fit=crop",
        alt: "Minimal Stairs",
        className: "col-span-1 row-span-2",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop",
        alt: "Aegean Sea Texture",
        className: "col-span-1 row-span-1",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop",
        alt: "Spa Details",
        className: "col-span-2 row-span-1 md:col-span-3 lg:col-span-2",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    },
};

export default function MasonryGallery() {
    const t = useTranslations("Gallery");

    return (
        <section className="py-24 bg-aegean-white px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h2 className="text-3xl font-light tracking-tight text-aegean-deep uppercase mb-4">
                            {t('title')}
                        </h2>
                        <p className="text-aegean-deep/70 max-w-md text-sm">
                            {t('subtitle')}
                        </p>
                    </div>
                    <div className="text-xs font-bold tracking-widest text-aegean-sky uppercase">
                        @AethraResort
                    </div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[250px]"
                >
                    {galleryImages.map((img) => (
                        <motion.div
                            key={img.id}
                            variants={itemVariants}
                            className={`relative overflow-hidden group border border-aegean-mist rounded-none ${img.className}`}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-aegean-deep/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}