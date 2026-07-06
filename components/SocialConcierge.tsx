"use client";

import { useTranslations } from "next-intl";
import { IconWhatsApp, IconInstagram, IconFacebook } from "@/components/AegeanIcons";

export default function SocialConcierge() {
    const t = useTranslations("Social");
    const phoneNumber = "306900000000";
    const textPreset = encodeURIComponent(t("whatsapp_preset"));
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${textPreset}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none group">

            {/* Secondary Quick Links (Instagram / Facebook) - Πλέον ΠΑΝΤΑ ορατά με elegant opacity */}
            <div className="flex flex-col gap-2 transition-all duration-300 pointer-events-auto opacity-70 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white border border-aegean-mist text-aegean-deep hover:text-aegean-sky hover:border-aegean-deep rounded-full shadow-sm hover:scale-110 transition-all duration-200"
                >
                    <IconInstagram className="w-3.5 h-3.5" />
                </a>
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white border border-aegean-mist text-aegean-deep hover:text-aegean-sky hover:border-aegean-deep rounded-full shadow-sm hover:scale-110 transition-all duration-200"
                >
                    <IconFacebook className="w-3.5 h-3.5" />
                </a>
            </div>

            {/* Main Premium Floating WhatsApp Trigger */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn pointer-events-auto flex items-center gap-2.5 px-4 py-3 bg-white border border-emerald-200 text-emerald-600 rounded-full shadow-lg hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
            >
        <span className="text-[10px] font-bold uppercase tracking-widest max-w-0 overflow-hidden group-hover/btn:max-w-xs transition-all duration-500 ease-out whitespace-nowrap block">
          {t("chat_concierge")}
        </span>
                <IconWhatsApp className="w-4 h-4 text-emerald-600" />
            </a>

        </div>
    );
}