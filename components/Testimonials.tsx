"use client";

import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { IconQuote } from "./AegeanIcons";

// --- MOCK REVIEWS DATA ---
const mockReviews = [
    {
        id: 1,
        name: "Alex Thompson",
        country: "UK",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
        text: "An unforgettable experience. The minimal design perfectly captures the spirit of Greece. Waking up to that sea view was breathtaking.",
        date: "June 2024",
    },
    {
        id: 2,
        name: "Marie Dubois",
        country: "France",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        text: "Absolument magnifique! The service was impeccably refined yet warm. The attention to geometric detail in the architecture is rare and exquisite.",
        date: "May 2024",
    },
    {
        id: 3,
        name: "Jürgen Weber",
        country: "Germany",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        rating: 4,
        text: "Flawless minimal aesthetic and incredible pool. Very professional staff. Perfect for those seeking tranquility over typical luxury noise.",
        date: "June 2024",
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            delay: index * 0.2,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export default function Testimonials() {
    const t = useTranslations("Testimonials");

    return (
        <section className="py-24 bg-white px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-light tracking-tight text-aegean-deep uppercase mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-aegean-deep/70 max-w-2xl mx-auto text-sm">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockReviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            className="bg-aegean-white p-10 border border-aegean-mist rounded-none shadow-sm h-full flex flex-col hover:border-aegean-sky hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="flex items-start justify-between mb-8 flex-shrink-0">
                                <div className="border border-aegean-mist p-3 rounded-none bg-white">
                                    <IconQuote className="w-6 h-6 text-aegean-sky" strokeWidth={2} />
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky">{review.rating} / 5</span>
                                    <span className="text-xs text-aegean-deep/50">{review.date}</span>
                                </div>
                            </div>

                            <p className="text-aegean-deep/80 text-sm leading-relaxed font-light mb-10 flex-grow italic">
                                "{review.text}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-aegean-mist pt-8 flex-shrink-0 mt-auto">
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-none object-cover border-2 border-aegean-sky shadow-md"
                                />
                                <div className="flex flex-col">
                                    <span className="font-bold text-aegean-deep text-sm tracking-tight">{review.name}</span>
                                    <span className="text-xs text-aegean-deep/60 uppercase tracking-widest">{review.country}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}