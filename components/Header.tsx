"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconPhone, IconMapPin, IconFlagEN, IconFlagEL, IconFlagFR, IconFlagDE, IconFlagIT, IconFlagES } from "./AegeanIcons";
import { Link, usePathname, useRouter, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

const FlagIcon = ({ locale }: { locale: string }) => {
    const className = "w-5 h-auto object-contain border border-aegean-mist/30";

    switch (locale) {
        case "el": return <IconFlagEL className={className} />;
        case "fr": return <IconFlagFR className={className} />;
        case "de": return <IconFlagDE className={className} />;
        case "it": return <IconFlagIT className={className} />;
        case "es": return <IconFlagES className={className} />;
        case "en": return <IconFlagEN className={className} />;
        default: return <IconFlagEN className={className} />;
    }
};

export default function Header() {
    const t = useTranslations("Header");
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [isLangSwitcherOpen, setIsLangSwitcherOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLanguageChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setIsLangSwitcherOpen(false);
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500",
                isScrolled ? "bg-white border-b border-aegean-mist shadow-sm py-0" : "bg-transparent border-transparent py-2"
            )}
        >
            <div
                className={cn(
                    "text-[10px] font-medium tracking-widest uppercase py-2 px-6 flex justify-between transition-colors duration-500",
                    isScrolled ? "bg-aegean-white text-aegean-deep" : "bg-transparent text-white/80 border-b border-white/10"
                )}
            >
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <IconMapPin className={cn("w-3 h-3", isScrolled ? "text-aegean-sky" : "text-white")} />
                        SANTORINI, GREECE
                    </div>
                    <div className="flex items-center gap-1.5">
                        <IconPhone className={cn("w-3 h-3", isScrolled ? "text-aegean-sky" : "text-white")} />
                        +30 210 1234567
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="flex items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <img
                        src="/logo-aegean.svg"
                        alt="Aethra Aegean Resort"
                        className={cn("h-8 transition-all duration-500", !isScrolled && "brightness-0 invert")}
                    />
                    <div className={cn("flex flex-col transition-colors duration-500", isScrolled ? "text-aegean-deep" : "text-white")}>
                        <span className="font-light text-xl tracking-tight uppercase leading-none">AETHRA</span>
                        <span className={cn("font-bold text-[8px] tracking-[0.2em] uppercase leading-none", isScrolled ? "text-aegean-deep" : "text-white/80")}>
                            AEGEAN RESORT
                        </span>
                    </div>
                </Link>

                {/* Links */}
                <nav className={cn("hidden md:flex items-center gap-8 transition-colors duration-500", isScrolled ? "text-aegean-deep" : "text-white")}>
                    <Link href="/rooms" className="text-xs font-medium uppercase tracking-widest hover:text-aegean-sky transition">{t('nav_rooms')}</Link>
                    <Link href="/experiences" className="text-xs font-medium uppercase tracking-widest hover:text-aegean-sky transition">{t('nav_experiences')}</Link>
                    <Link href="/gallery" className="text-xs font-medium uppercase tracking-widest hover:text-aegean-sky transition">{t('nav_gallery')}</Link>
                    <Link href="/contact" className="text-xs font-medium uppercase tracking-widest hover:text-aegean-sky transition">{t('nav_contact')}</Link>
                </nav>

                {/* Actions (Language & Book Now) */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        {/* Language Button */}
                        <button
                            onClick={() => setIsLangSwitcherOpen(!isLangSwitcherOpen)}
                            className={cn(
                                "flex items-center gap-2 border p-2 rounded-none transition duration-300",
                                isScrolled
                                    ? "text-aegean-deep border-aegean-mist hover:bg-aegean-white"
                                    : "text-white border-white/30 hover:bg-white/10"
                            )}
                        >
                            <FlagIcon locale={locale} />
                            <IconChevronDown className={cn("w-4 h-4 transition-transform", isLangSwitcherOpen && "rotate-180", isScrolled ? "text-aegean-sky" : "text-white")} />
                        </button>

                        {/* Language Dropdown (Παραμένει λευκό για αναγνωσιμότητα) */}
                        <AnimatePresence>
                            {isLangSwitcherOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full right-0 mt-2 min-w-[200px] bg-white shadow-2xl divide-y divide-aegean-mist border border-aegean-mist rounded-none overflow-hidden"
                                >
                                    <div className="p-3 bg-aegean-white text-[9px] font-bold tracking-widest uppercase text-aegean-sky">{t('select_language')}</div>

                                    {routing.locales.map((loc) => (
                                        <button
                                            key={loc}
                                            onClick={() => handleLanguageChange(loc)}
                                            className="w-full flex items-center gap-4 p-4 text-left hover:bg-aegean-white transition"
                                        >
                                            <div className="flex-shrink-0 border border-aegean-mist p-0.5"><FlagIcon locale={loc} /></div>
                                            <span className="text-sm font-medium text-aegean-deep uppercase tracking-tighter">{t(`lang_${loc}`)}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Book Now Button */}
                    <Link
                        href="/book"
                        className={cn(
                            "px-6 py-2.5 text-xs font-bold tracking-widest uppercase rounded-none transition-all active:scale-95",
                            isScrolled
                                ? "bg-aegean-deep text-white hover:bg-aegean-sky"
                                : "bg-white text-aegean-deep hover:bg-white/90"
                        )}
                    >
                        {t('nav_book_now')}
                    </Link>
                </div>
            </div>
        </header>
    );
}