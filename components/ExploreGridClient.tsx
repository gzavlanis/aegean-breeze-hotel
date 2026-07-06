"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const CustomBespokeMap = dynamic(() => import("@/components/CustomBespokeMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[500px] lg:min-h-[600px] bg-aegean-mist/20 flex items-center justify-center border border-aegean-mist">
            <span className="text-xs font-bold tracking-widest text-aegean-deep/40 uppercase animate-pulse">
                Loading Map Portal...
            </span>
        </div>
    ),
});

interface ExploreGridClientProps {
    description: string;
}

export default function ExploreGridClient({ description }: ExploreGridClientProps) {
    const t = useTranslations("Explore");

    return (
        <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky block">
          THE ISLAND MATRIX
        </span>
                <h2 className="text-3xl font-light text-aegean-deep uppercase tracking-tight">
                    Curated Landmarks
                </h2>
                <p className="text-aegean-deep/80 font-light text-sm leading-relaxed">
                    {description}
                </p>

                <div className="pt-6 border-t border-aegean-mist/60 space-y-3">
                    <span className="text-[9px] font-bold tracking-widest text-aegean-deep/40 uppercase block">
                        {t("map_key")}
                    </span>
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-3 text-xs font-light text-aegean-deep/80">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 block shadow-sm border border-blue-200" />
                            <span>{t("key_heritage")}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-light text-aegean-deep/80">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 block shadow-sm border border-red-200" />
                            <span>{t("key_dining")}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-light text-aegean-deep/80">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 block shadow-sm border border-emerald-200" />
                            <span>{t("key_beach")}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-7 w-full sticky top-28 bg-white shadow-sm overflow-hidden">
                <CustomBespokeMap />
            </div>

        </section>
    );
}