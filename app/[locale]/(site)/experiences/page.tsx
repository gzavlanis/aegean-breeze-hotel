import { getTranslations } from "next-intl/server";
import ContactSection from "@/components/ContactSection";
import { IconArrowRight } from "@/components/AegeanIcons";
import { Link } from "@/i18n/routing";

interface ExperienceItem {
    key: string;
    image: string;
    hours: string;
    location: string;
    highlight: string;
}

const experiencesData: ExperienceItem[] = [
    {
        key: "dining",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1500&auto=format&fit=crop",
        hours: "19:00 - 23:30",
        location: "Aethra Cliff Horizon",
        highlight: "Michelin-Starred Chef Menu"
    },
    {
        key: "wellness",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1500&auto=format&fit=crop",
        hours: "09:00 - 21:00",
        location: "Soma Sanctuary",
        highlight: "Volcanic Stone Therapy"
    },
    {
        key: "yachting",
        image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1500&auto=format&fit=crop",
        hours: "Sunrise / Sunset Cruise",
        location: "Ammoudi Private Pier",
        highlight: "Private Catamaran Fleet"
    },
    {
        key: "wine",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1500&auto=format&fit=crop",
        hours: "17:00 - 20:00",
        location: "The Sacred Cellar",
        highlight: "Rare Assyrtiko Tasting"
    }
];

interface ExperiencesPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ExperiencesPage({ params }: ExperiencesPageProps) {
    // Unwrapping params ασύγχρονα
    const { locale } = await params;
    const t = await getTranslations("Experiences");

    return (
        <main className="min-h-screen bg-aegean-white">

            {/* 1. Luxury Experiences Hero Banner */}
            <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-aegean-deep">
                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
                    alt="Aethra Experiences"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-aegean-white/10" />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-aegean-sky mb-4 block drop-shadow-sm">
            AEGEAN IMMERSION
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

            {/* 2. Full-Bleed Editorial Experiences List */}
            <section className="py-24 space-y-32 md:space-y-48">
                {experiencesData.map((item, index) => {
                    const isEven = index % 2 !== 0;

                    return (
                        <div
                            key={item.key}
                            className={`max-w-7xl mx-auto px-6 flex flex-col ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-24`}
                        >
                            {/* Image Side with Frame */}
                            <div className="w-full lg:w-1/2 relative group overflow-hidden border border-aegean-mist shadow-sm">
                                <div className="relative h-[45vh] lg:h-[55vh] min-h-[350px] overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={t(item.key)}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                                    />
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 space-y-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-aegean-sky block">
                  0{index + 1} / EXPERIENCE
                </span>

                                <h2 className="text-3xl md:text-4xl font-light text-aegean-deep uppercase tracking-tight">
                                    {t(item.key)}
                                </h2>

                                <p className="text-aegean-deep/80 font-light text-sm md:text-base leading-relaxed">
                                    {t(`${item.key}_desc`)}
                                </p>

                                {/* Additional Dummy Rich Text to fill the page beautifully */}
                                <p className="text-aegean-deep/60 font-light text-xs md:text-sm leading-relaxed">
                                    Every detail of this journey is precisely curated to engage your senses and connect you directly with the raw luxury of the Cyclades. We offer custom tailoring for private parties and specific requirements upon request.
                                </p>

                                {/* Technical Specifications / Info Matrix */}
                                <div className="grid grid-cols-2 gap-4 border-t border-b border-aegean-mist/60 py-5 my-8 text-xs">
                                    <div>
                                        <span className="text-aegean-deep/40 block uppercase font-medium tracking-wider mb-1">Hours</span>
                                        <span className="text-aegean-deep font-light">{item.hours}</span>
                                    </div>
                                    <div>
                                        <span className="text-aegean-deep/40 block uppercase font-medium tracking-wider mb-1">Location</span>
                                        <span className="text-aegean-deep font-light">{item.location}</span>
                                    </div>
                                    <div className="col-span-2 pt-2 border-t border-aegean-mist/30">
                                        <span className="text-aegean-deep/40 block uppercase font-medium tracking-wider mb-1">Exclusivity</span>
                                        <span className="text-aegean-sky font-medium tracking-wide uppercase text-[11px]">{item.highlight}</span>
                                    </div>
                                </div>

                                {/* Minimal CTA Link */}
                                <Link
                                    href={`/experiences/${item.key}`}
                                    className="group/btn flex items-center gap-4 text-aegean-deep font-bold tracking-widest uppercase text-xs w-max"
                                >
  <span className="border-b border-transparent group-hover/btn:border-aegean-deep transition-colors pb-1">
    {t("discover")}
  </span>
                                    <IconArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* 3. Global Contact Section */}
            <ContactSection />
        </main>
    );
}