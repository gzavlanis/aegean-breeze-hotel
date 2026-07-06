"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { IconArrowRight } from "./AegeanIcons";

interface ExperienceItem {
    id: number;
    slug: string;
    nameKey: string;
    descKey: string;
    price: number;
    duration: string;
    mainImage: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.3 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    },
};

export default function Experiences() {
    const t = useTranslations("Experiences");
    const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/experiences")
            .then((res) => res.json())
            .then((data) => {
                setExperiences(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading live experiences:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center text-aegean-sky tracking-widest text-xs uppercase font-bold">
                Loading Luxury Experiences...
            </div>
        );
    }

    return (
        <section className="py-32 bg-white px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24 md:w-2/3">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-light tracking-tight text-aegean-deep uppercase mb-6 leading-tight"
                    >
                        {t('title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-aegean-deep/70 max-w-lg text-sm leading-relaxed"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col gap-32"
                >
                    {experiences.map((exp, index) => {
                        const isEven = index % 2 !== 0;

                        return (
                            <motion.div
                                key={exp.id}
                                variants={itemVariants}
                                className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
                            >
                                <div className="w-full md:w-1/2 relative group">
                                    <div className="relative h-[60vh] min-h-[400px] overflow-hidden border border-aegean-mist rounded-none">
                                        <img
                                            src={exp.mainImage}
                                            alt={t(exp.nameKey)}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className={`absolute top-8 ${isEven ? '-right-8' : '-left-8'} w-full h-full border border-aegean-deep/10 -z-10 hidden md:block`} />
                                </div>

                                <div className="w-full md:w-1/2 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-aegean-sky">
                                            EXPERIENCE
                                        </span>
                                        <span className="text-[10px] px-2 py-0.5 border border-aegean-mist text-aegean-deep/60 rounded-full font-light">
                                            {exp.duration}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-light tracking-tight text-aegean-deep uppercase mb-8 leading-tight">
                                        {t(exp.nameKey)}
                                    </h3>

                                    <p className="text-aegean-deep/80 text-sm leading-relaxed font-light mb-12">
                                        {t(exp.descKey)}
                                    </p>

                                    <Link
                                        href={`/experiences/${exp.slug}`}
                                        className="group/btn flex items-center gap-4 text-aegean-deep font-bold tracking-widest uppercase text-xs w-max"
                                    >
                                        <span className="border-b border-transparent group-hover/btn:border-aegean-deep transition-colors pb-1">
                                            {t('discover')}
                                        </span>
                                        <IconArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}