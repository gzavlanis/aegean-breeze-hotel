import { getTranslations } from "next-intl/server";
import ExploreGridClient from "@/components/ExploreGridClient";
import ContactSection from "@/components/ContactSection";

interface ExplorePageProps {
    params: Promise<{ locale: string }>;
}

export default async function ExplorePage({ params }: ExplorePageProps) {
    await params;
    const t = await getTranslations("Explore");

    return (
        <main className="min-h-screen bg-aegean-white">
            <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-aegean-deep">
                <img
                    src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2000"
                    alt="Santorini Caldera Exploration"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-aegean-white/10" />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-16">
                    <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-aegean-sky mb-4 block">
                        INSIDER CONCIERGE
                    </span>
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white uppercase mb-6 leading-tight">
                        {t("title")}
                    </h1>
                    <div className="w-12 h-[1px] bg-white/40 mx-auto mb-6" />
                    <p className="text-white/90 max-w-2xl text-xs md:text-sm leading-relaxed font-light mx-auto">
                        {t("subtitle")}
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-aegean-white to-transparent pointer-events-none" />
            </section>

            <ExploreGridClient description="Explore the real-time geographic layout of Santorini. Click on any interactive marker node directly on the map stream to reveal detailed location imagery, curated descriptions, and elite outbound web navigation links." />

            <ContactSection />
        </main>
    );
}