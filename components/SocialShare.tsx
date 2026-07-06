"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { IconFacebook, IconWhatsApp } from "@/components/AegeanIcons";

export default function SocialShare() {
    const t = useTranslations("Social");
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        setCurrentUrl(encodeURIComponent(window.location.href));
    }, []);

    if (!currentUrl) return null;

    return (
        <div className="flex items-center gap-4 py-4 border-t border-b border-aegean-mist/40">
      <span className="text-[10px] font-bold tracking-widest text-aegean-deep/40 uppercase">
        {t("share_page")}
      </span>
            <div className="flex items-center gap-2">
                {/* Facebook Share */}
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-aegean-deep/60 hover:text-aegean-deep border border-aegean-mist/60 hover:border-aegean-deep rounded-full transition-all"
                >
                    <IconFacebook className="w-3.5 h-3.5" />
                </a>

                {/* WhatsApp Share */}
                <a
                    href={`https://wa.me/?text=${currentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-aegean-deep/60 hover:text-emerald-600 border border-aegean-mist/60 hover:border-emerald-200 rounded-full transition-all"
                >
                    <IconWhatsApp className="w-3.5 h-3.5" />
                </a>
            </div>
        </div>
    );
}