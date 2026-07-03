"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { IconInstagram, IconFacebook, IconX, IconArrowRight } from "./AegeanIcons";

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-aegean-deep text-white pt-24 pb-8 px-6 border-t border-aegean-mist">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 mb-20">
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex flex-col text-white group w-max">
                            <span className="font-light text-2xl tracking-tight uppercase leading-none">AETHRA</span>
                            <span className="font-bold text-[9px] tracking-[0.2em] uppercase leading-none text-aegean-sky group-hover:text-white transition-colors">
                                AEGEAN RESORT
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm font-light leading-relaxed max-w-xs">
                            {t('description')}
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-aegean-sky">{t('explore')}</h4>
                        <nav className="flex flex-col gap-4">
                            <Link href="/rooms" className="text-sm font-light text-white/70 hover:text-white transition-colors w-max">{t('nav_rooms')}</Link>
                            <Link href="/experiences" className="text-sm font-light text-white/70 hover:text-white transition-colors w-max">{t('nav_experiences')}</Link>
                            <Link href="/gallery" className="text-sm font-light text-white/70 hover:text-white transition-colors w-max">{t('nav_gallery')}</Link>
                            <Link href="/contact" className="text-sm font-light text-white/70 hover:text-white transition-colors w-max">{t('nav_contact')}</Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-aegean-sky">{t('info')}</h4>
                        <nav className="flex flex-col gap-4">
                            <Link href="/faq" className="text-sm font-light text-white/70 hover:text-white transition-colors w-max">{t('faq')}</Link>
                            <Link href="/terms" className="text-sm font-light text-white/70 hover:text-white transition-colors w-max">{t('terms')}</Link>
                            <Link href="/privacy" className="text-sm font-light text-white/70 hover:text-white transition-colors w-max">{t('privacy')}</Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-aegean-sky">{t('newsletter')}</h4>
                        <p className="text-sm font-light text-white/60 mb-2">
                            {t('newsletter_desc')}
                        </p>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex items-end border-b border-white/20 hover:border-white transition-colors pb-2 group"
                        >
                            <input
                                type="email"
                                placeholder={t('email_placeholder')}
                                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30 flex-grow rounded-none focus:ring-0"
                                required
                            />
                            <button
                                type="submit"
                                className="text-white/50 group-hover:text-white transition-colors p-1"
                                aria-label="Subscribe"
                            >
                                <IconArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
                    <div className="text-[11px] font-light text-white/40 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} Aethra Aegean Resort. {t('rights')}
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-aegean-sky transition-colors">
                            <IconInstagram className="w-5 h-5" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-aegean-sky transition-colors">
                            <IconFacebook className="w-5 h-5" />
                        </a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-aegean-sky transition-colors">
                            <IconX className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}