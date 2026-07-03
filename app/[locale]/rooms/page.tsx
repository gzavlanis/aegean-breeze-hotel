import { useTranslations } from "next-intl";
import RoomsGrid from "@/components/RoomsGrid";
import ContactSection from "@/components/ContactSection";

interface RoomsPageProps {
    params: Promise<{ locale: string }>;
}

export default async function RoomsPage({ params }: RoomsPageProps) {
    // Unwrapping params για το Next.js 15+
    const { locale } = await params;

    return (
        <main className="min-h-screen bg-aegean-white">
            <RoomsHeader />
            <div className="py-24">
                <RoomsGrid />
            </div>
            <ContactSection />
        </main>
    );
}

function RoomsHeader() {
    const t = useTranslations("Rooms");

    return (
        <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-aegean-deep">
            <img
                src="https://images.unsplash.com/photo-1515260268569-9271009adfdb?q=80&w=2000&auto=format&fit=crop"
                alt="Aethra Luxury Accommodations"
                className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-aegean-white/10" />
            <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-16">
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-aegean-sky mb-4 block drop-shadow-sm">
          AETHRA ACCOMMODATION
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
    );
}