import { getTranslations } from "next-intl/server";
import ContactSection from "@/components/ContactSection";

interface StatPillar {
    value: string;
    labelKey: string;
}

const statsData: StatPillar[] = [
    { value: "14", labelKey: "pillar_villas" },
    { value: "6.5", labelKey: "pillar_estate" },
    { value: "2", labelKey: "pillar_chefs" }
];

interface AboutPageProps {
    params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
    await params;
    const t = await getTranslations("About");

    return (
        <main className="min-h-screen bg-aegean-white">

            {/* 1. Immersive Editorial Hero */}
            <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-aegean-deep">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
                    alt="Aethra Sanctuary Heritage"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-aegean-white/10" />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-aegean-sky mb-4 block drop-shadow-sm">
            {t("story_title")}
          </span>
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white uppercase mb-6 leading-tight drop-shadow-md">
                        {t("title")}
                    </h1>
                    <div className="w-12 h-[1px] bg-white/40 mx-auto mb-6" />
                    <p className="text-white/90 max-w-2xl text-xs md:text-sm leading-relaxed font-light mx-auto drop-shadow-sm">
                        {t("subtitle")}
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-aegean-white to-transparent pointer-events-none" />
            </section>

            {/* 2. Full-Bleed Alternate Narrative Rows */}
            <section className="py-24 space-y-32 md:space-y-48">

                {/* Row 1: Architecture */}
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <div className="w-full lg:w-1/2 border border-aegean-mist shadow-sm overflow-hidden">
                        <div className="h-[45vh] lg:h-[55vh] min-h-[350px]">
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1500"
                                alt="Aethra Architectural Design"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky block">
              CHAPTER I
            </span>
                        <h2 className="text-3xl font-light text-aegean-deep uppercase tracking-tight">
                            {t("arch_title")}
                        </h2>
                        <p className="text-aegean-deep/80 font-light text-sm md:text-base leading-relaxed">
                            {t("arch_desc")}
                        </p>
                    </div>
                </div>

                {/* Row 2: Service / Hospitality */}
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
                    <div className="w-full lg:w-1/2 border border-aegean-mist shadow-sm overflow-hidden">
                        <div className="h-[45vh] lg:h-[55vh] min-h-[350px]">
                            <img
                                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1500"
                                alt="Bespoke Luxury Experience"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky block">
              CHAPTER II
            </span>
                        <h2 className="text-3xl font-light text-aegean-deep uppercase tracking-tight">
                            {t("service_title")}
                        </h2>
                        <p className="text-aegean-deep/80 font-light text-sm md:text-base leading-relaxed">
                            {t("service_desc")}
                        </p>
                    </div>
                </div>

            </section>

            {/* 3. Minimal Technical Pillars (Numbers Grid) */}
            <section className="bg-white border-t border-b border-aegean-mist py-20 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {statsData.map((stat, idx) => (
                        <div key={idx} className="space-y-2">
              <span className="text-4xl md:text-5xl font-light tracking-tight text-aegean-deep block">
                {stat.value}
              </span>
                            <div className="w-6 h-[1px] bg-aegean-sky mx-auto my-3" />
                            <span className="text-[10px] text-aegean-deep/50 uppercase font-bold tracking-widest block">
                {t(stat.labelKey)}
              </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Global Contact Section */}
            <div className="bg-aegean-white pt-12">
                <ContactSection />
            </div>
        </main>
    );
}